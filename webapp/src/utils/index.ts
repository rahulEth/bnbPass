/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserProvider } from "ethers";
import { Eip1193Provider } from "ethers";
import { ethers } from "ethers";

export const getBowserProvider = (ethereum: Eip1193Provider) => {
  return new ethers.BrowserProvider(ethereum);
};

export const getSignerDetails = async (provider: BrowserProvider) => {
  const signer = await provider.getSigner();
  return signer;
};

export const getConnectedAccountAddress = async (provider: BrowserProvider) => {
  const signer = await getSignerDetails(provider);
  const accountAddress = await signer.getAddress();
  return accountAddress;
};

export const getMaskedAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(38)}`;
};
