import { createContext, PropsWithChildren, useEffect } from "react";
import useWeb3Reducer, { Web3ProviderState } from "../reducers/useWeb3Reducer";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { getConnectedAccountAddress } from "../utils";
import createMetaMaskProvider from "metamask-extension-provider";

export const Web3ProviderContext = createContext<Web3ProviderState | null>(
  null
);

export interface Web3DispatchContextProps {
  connect: () => Promise<void>;
}

export const Web3DispatchContext =
  createContext<Web3DispatchContextProps | null>(null);

const Web3Provider = ({ children }: PropsWithChildren) => {
  const { providerState, setProvider, setAccount, setIsLoading, setError } =
    useWeb3Reducer();

  const { provider } = providerState;

  const connect = async () => {
    setIsLoading(true);
    if (provider) {
      console.log("provider detected", provider.chainId);
      try {
        // Create ethers provider and get accounts
        const accountAddress = await getConnectedAccountAddress(
          provider as unknown as MetaMaskInpageProvider
        );
        console.log("accountAddress: ", accountAddress);

        setAccount(accountAddress);
      } catch (error) {
        console.error(error);
        setError("Access denied");
      }
    } else {
      setError(
        "MetaMask is not installed. Please install Metamask to use this app."
      );
      console.error(
        "MetaMask is not installed. Please install Metamask to use this app."
      );
    }
    setIsLoading(false);
  };

  const getConnectedWallet = async (provider: MetaMaskInpageProvider) => {
    try {
      const addressArray = await provider.request({
        method: "eth_accounts",
      });
      if (Array.isArray(addressArray) && addressArray.length > 0) {
        const accountAddress = await getConnectedAccountAddress(provider);
        setAccount(accountAddress);
      } else {
        setAccount(undefined);
      }
    } catch (err) {
      console.error(err);
      setError("Access denied");
    }
  };

  /* const getChangedAccount = (provider: MetaMaskInpageProvider) => {
    return async (accounts: string[]) => {
      if (accounts.length > 0) {
        const accountAddress = await getConnectedAccountAddress(provider);
        setAccount(accountAddress);
      } else {
        setAccount(null);
      }
    };
  }; */

  useEffect(() => {
    setIsLoading(true);
    const _provider =
      createMetaMaskProvider() as unknown as MetaMaskInpageProvider;
    if (_provider) {
      setProvider(_provider);
      getConnectedWallet(_provider);
      // TODO: Handles change in the connected account
      // _provider.on("accountsChanged", getChangedAccount(_provider));
    } else {
      setError(
        "MetaMask is not installed. Please install Metamask to use this app."
      );
      console.error(
        "MetaMask is not installed. Please install Metamask to use this app."
      );
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Web3ProviderContext.Provider value={providerState}>
      <Web3DispatchContext.Provider value={{ connect }}>
        {children}
      </Web3DispatchContext.Provider>
    </Web3ProviderContext.Provider>
  );
};

export default Web3Provider;
