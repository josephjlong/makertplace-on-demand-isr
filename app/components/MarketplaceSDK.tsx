"use client";

import { useEffect, useState, useRef } from "react";
import { ClientSDK } from "@sitecore-marketplace-sdk/client";
import { XMC } from "@sitecore-marketplace-sdk/xmc";
import { useTransition } from "react";
import { triggerRevalidation } from "@/lib/actions/revalidate";
import { Box, Heading, Button, Stack, Text, useToast } from "@chakra-ui/react";

const defaultHostURL = "https://pages.sitecorecloud.io";

interface PagesContext {
  pageInfo?: {
    path?: string;
    language?: string;
    displayName?: string;
    name?: string;
    route?: string;
  };
  siteInfo?: {
    name?: string;
  };
}

export default function MarketplaceSDKComponent() {
  const [isClientSDKInitialized, setIsClientSDKInitialized] = useState(false);
  const [pagesContext, setPagesContext] = useState<PagesContext>({});
  const clientRef = useRef<ClientSDK | null>(null);

  const [isFetchingContext, startContextTransition] = useTransition();
  const [isPending, startTransition] = useTransition();

  const toast = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const queryParams = new URLSearchParams(window.location.search);
    const origin = queryParams.get("origin") || defaultHostURL;

    const init = async () => {
      try {
        const client = await ClientSDK.init({
          origin,
          target: window.parent,
          modules: [XMC],
        });
        clientRef.current = client;
        setIsClientSDKInitialized(true);
      } catch (error) {
        console.error("Client SDK initialization failed:", error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    return () => {
      clientRef.current?.destroy();
      clientRef.current = null;
      setIsClientSDKInitialized(false);
    };
  }, []);

  const fetchPagesContext = async () => {
    startContextTransition(async () => {
      if (!clientRef.current) {
        console.error(
          "SDK client not initialized. Cannot fetch pages context."
        );
        setPagesContext({});
        return;
      }

      try {
        const response = await clientRef.current.query("pages.context");
        if (response?.data) {
          setPagesContext(response.data);
        } else {
          console.warn("Pages context data not found:", response);
          setPagesContext({});
        }
      } catch (error) {
        console.error("Failed to fetch pages context:", error);
        setPagesContext({});
      }
    });
  };

  const handleClick = () => {
    startTransition(async () => {
      const result = await triggerRevalidation({ language, site, isrPath });

      if (!language || !site || !isrPath) {
        toast({
          title: "Revalidation path is not correct",
          description: `Please check the revalidation path "${revalidatePath}" some values are missing.`,
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      } else if (result.success) {
        toast({
          title: "Revalidation triggered",
          description: `The path "${revalidatePath}" has been successfully revalidated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        toast({
          title: "Revalidation failed",
          description: `Something went wrong while triggering revalidation for path "${revalidatePath}".`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    });
  };

  useEffect(() => {
    if (isClientSDKInitialized) {
      fetchPagesContext();
    }
  }, [isClientSDKInitialized]);

  const language = pagesContext.pageInfo?.language ?? "en";
  const site = pagesContext.siteInfo?.name ?? "";
  const name =
    pagesContext.pageInfo?.displayName ?? pagesContext.pageInfo?.name ?? "";
  const path = pagesContext.pageInfo?.path ?? "";
  const parts = path.split(site);
  const isrPath = pagesContext.pageInfo?.route ?? "";
  const revalidatePath = `/${language}/_site_${site}${isrPath}`;
  const matchedSite = {
    name: "Not found",
    url: "Not found",
  };
  let renderingHost = matchedSite.url;

  const targetSiteName = site; // Change this to the site name you want to match

  fetch("sites.json")
    .then((response) => response.json())
    .then((data) => {
      const matchedSite = data.sites.find(
        (site: { name: string; url: string }) => site.name === targetSiteName
      );

      if (matchedSite) {
        renderingHost = matchedSite.url;
      } else {
        console.log(`Site "${targetSiteName}" not found.`);
      }
    })
    .catch((error) => console.error("Error fetching JSON:", error));

  return (
    <Box textAlign="left" p={4}>
      <Heading as="h1" size="lg" mb={4}>
        Clear rendering host cache
      </Heading>

      <Stack direction="row" spacing={4} mb={4}>
        <Button
          colorScheme="teal"
          onClick={fetchPagesContext}
          isDisabled={isFetchingContext}
        >
          {isFetchingContext ? "Fetching..." : "Fetch page context"}
        </Button>
        <Button colorScheme="teal" onClick={handleClick} isDisabled={isPending}>
          {isPending ? "Revalidating..." : "Trigger Revalidation"}
        </Button>
      </Stack>

      {pagesContext.pageInfo && (
        <Box mt={6}>
          <Text>
            <strong>Name:</strong> {name}
          </Text>
          <Text>
            <strong>Path:</strong> {isrPath}
          </Text>
          <Text>
            <strong>Language:</strong> {language}
          </Text>
          <Text>
            <strong>Site:</strong> {site}
          </Text>
          <Text>
            <strong>Revalidate path:</strong> {revalidatePath}
          </Text>
          <Text>
            <strong>Rendering host:</strong> {matchedSite.url}
          </Text>
        </Box>
      )}
    </Box>
  );
}
