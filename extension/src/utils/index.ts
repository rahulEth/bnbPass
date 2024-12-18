import { MetaMaskInpageProvider } from "@metamask/providers";
import { AES, enc } from "crypto-js";
import { ethers } from "ethers";
import { GetCredentialsRes } from "../api";

export const getSignerDetails = async (ethereum: MetaMaskInpageProvider) => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  return signer;
};

export const getConnectedAccountAddress = async (
  ethereum: MetaMaskInpageProvider
) => {
  const signer = await getSignerDetails(ethereum);
  const accountAddress = await signer.getAddress();
  return accountAddress;
};

export const getMaskedAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(38)}`;
};

export const decryptSecret = (ciphertext: string, key: string) => {
  const bytes = AES.decrypt(ciphertext, key);
  const decryptedData = bytes.toString(enc.Utf8);
  return decryptedData;
};

export const getCredentialDetails = async (
  provider: MetaMaskInpageProvider,
  data: GetCredentialsRes
) => {
  const { appLink, encryptedUser, encryptedPassword } = data;
  const signer = await getSignerDetails(provider);
  const signature = await signer.signMessage(appLink);
  console.log("sign: ", signature);
  const user = decryptSecret(encryptedUser, signature);
  const password = decryptSecret(encryptedPassword, signature);
  console.log("details: ", { user, password });
  return { user, password };
};
