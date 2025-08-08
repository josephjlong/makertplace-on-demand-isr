import { ClientSDKContext } from "@/features/client-sdk/contexts/ClientSDKContext";
import { useContext } from "react";

export const useClientSDK = () => {
  return useContext(ClientSDKContext);
};
