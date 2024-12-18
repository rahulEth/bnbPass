import { BrowserProvider } from "ethers";
import { useReducer } from "react";

export interface Web3ProviderState {
  provider?: BrowserProvider;
  account?: string;
  isLoading: boolean;
  error?: string;
}

enum Web3ReducerActionType {
  SET_PROVIDER = "set_provider",
  SET_ACCOUNT = "set_account",
  SET_ERROR = "set_error",
  SET_loading = "set_loading",
}

const initState: Web3ProviderState = {
  provider: undefined,
  account: undefined,
  isLoading: false,
  error: undefined,
};

export interface UseWeb3ReducerProps {
  providerState: Web3ProviderState;
  setProvider: (provider: BrowserProvider) => void;
  setAccount: (account?: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
}

const useWeb3Reducer = () => {
  const [providerState, dispatch] = useReducer(web3Reducer, initState);

  const setProvider = (provider: BrowserProvider) => {
    dispatch({
      type: Web3ReducerActionType.SET_PROVIDER,
      payload: { provider },
    });
  };
  const setAccount = (account?: string) => {
    dispatch({
      type: Web3ReducerActionType.SET_ACCOUNT,
      payload: { account },
    });
  };

  const setIsLoading = (isLoading: boolean) => {
    dispatch({
      type: Web3ReducerActionType.SET_loading,
      payload: { isLoading },
    });
  };
  const setError = (error: string) => {
    dispatch({
      type: Web3ReducerActionType.SET_loading,
      payload: { error },
    });
  };

  return {
    providerState,
    setProvider,
    setAccount,
    setIsLoading,
    setError,
  };
};

export interface Web3ReducerAction {
  type: Web3ReducerActionType;
  payload: Partial<Web3ProviderState>;
}

const web3Reducer = (
  providerState: Web3ProviderState,
  action: Web3ReducerAction
) => {
  const { type, payload } = action;
  switch (type) {
    case Web3ReducerActionType.SET_PROVIDER:
      return {
        ...providerState,
        provider: payload.provider,
      };
    case Web3ReducerActionType.SET_ACCOUNT:
      return {
        ...providerState,
        account: payload.account,
      };
    case Web3ReducerActionType.SET_loading:
      return {
        ...providerState,
        isLoading: payload.isLoading || false,
      };
    case Web3ReducerActionType.SET_ERROR:
      return {
        ...providerState,
        error: payload.error,
        isLoading: false,
      };

    default:
      return providerState;
  }
};

export default useWeb3Reducer;
