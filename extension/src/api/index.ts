import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { getCredentialDetails } from "../utils";

const apiClient = axios.create({
  baseURL: " http://localhost:3000",
});

export enum CredType {
  BANKING = "banking",
  PERSONAL = "personal",
  SOCIAL = "social",
  OTHER = "other",
}

export interface UseMutationGetCredentials {
  appLink: string;
  address: string;
  provider?: MetaMaskInpageProvider;
}

export interface IpfsHashData {
  path: string;
}

export interface UseMutationGetCredentialsRes {
  user: string;
  password: string;
}

export interface GetCredentialsRes {
  _id: string;
  publicKey: string;
  address: string;
  ipfsHash: IpfsHashData[];
  encryptedUser: string;
  encryptedPassword: string;
  appLink: string;
  type: CredType;
  txHash: string;
}

export const useMutationGetCredentials = () => {
  return useMutation({
    mutationFn: async ({
      appLink,
      address,
      provider,
    }: UseMutationGetCredentials) => {
      const response = await apiClient.get("/api/getEncryptedCred", {
        params: { appLink, address },
      });
      console.log("response: ", response.data);

      const data = response.data as GetCredentialsRes;
      console.log("API call completed");

      if (!!provider) {
        const secrets = await getCredentialDetails(provider, data);
        return secrets;
      } else {
        throw new Error("Provider not detected");
      }
    },
    mutationKey: ["get-credentials"],
  });
};
