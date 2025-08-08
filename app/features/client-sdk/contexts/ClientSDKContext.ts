import { ClientSDK } from "@sitecore-marketplace-sdk/client";
import { createContext } from "react";

export const ClientSDKContext = createContext<ClientSDK | null>(null);
