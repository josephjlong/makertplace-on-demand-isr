import { Box, Heading, Button, Stack, Text, useToast } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Heading as="h1" size="lg" mb={4}>
        Site revalidation dashboard
      </Heading>
      <Heading as="h2" size="md" mb={4}>
        Revalidate by path
      </Heading>
      <Stack spacing={4} mb={8}>
        {[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Orders", path: "/orders" },
          { name: "Settings", path: "/settings" },
        ].map((item) => (
          <Box
            key={item.path}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={3}
            borderWidth={1}
            borderRadius="md"
          >
            <Text fontWeight="medium">{item.name}</Text>
            <Button size="sm" colorScheme="teal">
              Revalidate
            </Button>
          </Box>
        ))}
      </Stack>

      <Heading as="h2" size="md" mb={4}>
        Revalidate by tag
      </Heading>
      <Stack spacing={4}>
        {[
          { name: "Home", tag: "home" },
          { name: "Landing Pages", tag: "landing-pages" },
          { name: "News", tag: "news" },
          { name: "Blog", tag: "blog" },
          { name: "Content pages", tag: "content" },
        ].map((item) => (
          <Box
            key={item.tag}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={3}
            borderWidth={1}
            borderRadius="md"
          >
            <Text fontWeight="medium">{item.name}</Text>
            <Button size="sm" colorScheme="teal">
              Revalidate
            </Button>
          </Box>
        ))}
      </Stack>
    </div>
  );
}
