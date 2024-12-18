/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useEffect } from "react";
import useWeb3Reducer, { Web3ProviderState } from "../reducers/useWeb3Reducer";
import { getBowserProvider, getConnectedAccountAddress } from "../utils";
import { BrowserProvider } from "ethers";
import { WALLET_NOT_INSTALLED_ERROR } from "../constants";

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
    // Connect wallet
    if (!!provider) {
      try {
        // Create ethers provider and get accounts
        const accountAddress = await getConnectedAccountAddress(provider);
        setAccount(!!accountAddress ? accountAddress : undefined);
      } catch (error) {
        console.error(error);
        setError("Access denied");
      }
    } else {
      setError(WALLET_NOT_INSTALLED_ERROR);
    }
    setIsLoading(false);
  };

  const getConnectedWallet = async () => {
    const _ethereum = (window as any).ethereum;
    if (_ethereum && provider) {
      try {
        const addressArray = await _ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          const accountAddress = await getConnectedAccountAddress(provider);
          setAccount(accountAddress);
        } else {
          setAccount(undefined);
        }
      } catch (err) {
        console.error(err);
        setError("Access denied");
      }
    } else {
      setError(WALLET_NOT_INSTALLED_ERROR);
    }
  };

  const getChangedAccount =
    (provider: BrowserProvider) => async (accounts: string[]) => {
      if (accounts.length > 0) {
        const accountAddress = await getConnectedAccountAddress(provider);
        setAccount(accountAddress);
      } else {
        setAccount(undefined);
      }
    };

  useEffect(() => {
    setIsLoading(true);
    const _provider = getBowserProvider((window as any).ethereum);
    if (_provider) {
      setProvider(_provider);
      console.log("Provider Detected");
      getConnectedWallet();
      if (typeof (window as any).ethereum !== "undefined") {
        (window as any).ethereum.on(
          "accountsChanged",
          getChangedAccount(_provider)
        );
      }
    } else {
      setError(WALLET_NOT_INSTALLED_ERROR);
      console.error(WALLET_NOT_INSTALLED_ERROR);
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
