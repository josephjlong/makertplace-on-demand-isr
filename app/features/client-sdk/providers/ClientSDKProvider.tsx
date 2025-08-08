"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { ClientSDK } from "@sitecore-marketplace-sdk/client";
import { XMC } from "@sitecore-marketplace-sdk/xmc";
import { ClientSDKContext } from "@/features/client-sdk/contexts/ClientSDKContext";

interface ClientSDKProviderProps {
  children: ReactNode;
}

export const ClientSDKProvider: React.FC<ClientSDKProviderProps> = ({
  children,
}) => {
  const [client, setClient] = useState<ClientSDK | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Ensure this logic only runs on the client side
        const config = {
          target: window.parent, // `window` is safe to use here
          modules: [XMC],
          events: {
            onRouteUpdate: () => {},
          },
        };

        const client = await ClientSDK.init(config);
        (window as any).client = client; // Optional: Expose client globally for debugging
        setClient(client);
      } catch (error) {
        console.error("Failed to initialize ClientSDK:", error);
      }
    };

    init();
  }, []);

  // Render children only after the client is initialized
  if (!client) {
    return null; // Optionally, you can return a loading spinner here
  }

  return (
    <ClientSDKContext.Provider value={client}>
      {children}
    </ClientSDKContext.Provider>
  );
};
