import { useMutation, useQuery } from "@tanstack/react-query";
import { CredType } from "../enums/CredTypeEnums";
import { SaveCredFormProps } from "../components/SaveCredForm";
import axios from "axios";
import { AES } from "crypto-js";
import { BrowserProvider } from "ethers";
import { getSignerDetails } from "../utils";

const apiClient = axios.create({
  baseURL: " http://localhost:3000",
});

/* export const useQueryGetCredentials = () => {
  const isEmpty = false;
  const isError = false;
  return useQuery({
    queryFn: async () => {
      return new Promise<CredDetails[]>((resolve, reject) => {
        setTimeout(
          () => (isError ? reject() : resolve(isEmpty ? [] : MOCK_CREDS)),
          1000
        );
      });
    },
    queryKey: ["get-credentials"],
  });
}; */

export interface UseQueryGetCredentialsByType {
  type: CredType | "all";
  address: string;
}

export interface IpfsHashData {
  path: string;
}
export interface UseQueryGetCredentialsByTypeRes {
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
export const useQueryGetCredentialsByType = ({
  type,
  address,
}: UseQueryGetCredentialsByType) => {
  return useQuery({
    queryFn: async () => {
      const response = await apiClient.get("/api/getEncryptedCredsByType", {
        params: { type, address },
      });
      console.log("response: ", response.data);

      return response.data as UseQueryGetCredentialsByTypeRes[];
    },
    queryKey: ["get-credentials-by-type", type, address],
  });
};

export interface UseMutationSaveCredentialsRes {
  publicKey: string;
  address: string;
  appLink: string;
  ipfsHash: IpfsHashData[];
  encryptedUser: string;
  encryptedPassword: string;
  encryptedappLink: string;
  type: CredType;
}

export interface UseMutationSaveCredentials extends SaveCredFormProps {
  provider: BrowserProvider;
  address: string;
}
export const useMutationSaveCredentials = () => {
  return useMutation({
    mutationFn: async (data: UseMutationSaveCredentials) => {
      const { url, username, password, type, provider, address } = data;
      const signer = await getSignerDetails(provider);
      const signature = await signer.signMessage(data.url);
      console.log("sign: ", signature);
      const encryptedUser = AES.encrypt(username, signature).toString();
      const encryptedPassword = AES.encrypt(password, signature).toString();
      const encryptedappLink = AES.encrypt(url, signature).toString();
      const res = await apiClient.post("/api/saveCred", {
        publicKey: `pub${address}`,
        address: address,
        appLink: url,
        encryptedUser,
        encryptedPassword,
        encryptedappLink,
        type: type,
      });
      console.log("response: ", res.data);
      return res.data as UseMutationSaveCredentialsRes;
    },
    mutationKey: ["save-credentials"],
  });
};
