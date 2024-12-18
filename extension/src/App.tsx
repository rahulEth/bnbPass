import BnbPass from "/bnb-pass.svg";
import "./App.css";
import {
  Web3DispatchContext,
  Web3ProviderContext,
} from "./contexts/Web3Context";
import { useContext, useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { getMaskedAddress } from "./utils";
import { useMutationGetCredentials, UseMutationGetCredentialsRes } from "./api";
import UserField from "./components/UserField";
import PasswordField from "./components/PasswordField";

function App() {
  const { account, isLoading, error, provider } =
    useContext(Web3ProviderContext) || {};
  const { connect } = useContext(Web3DispatchContext) || {};
  const [responseError, setResponseError] = useState<string>("");
  const [secret, SetSecret] = useState<UseMutationGetCredentialsRes>();
  const {
    mutate,
    isPending,
    status: mutateStatus,
    error: mutateError,
    data: mutateData,
  } = useMutationGetCredentials();

  const onClickConnect = async () => {
    if (!!connect) {
      console.log("called");

      await connect();
    }
  };

  useEffect(() => {
    if (mutateStatus === "error") {
      console.log("mutateError: ", mutateError);

      setResponseError(mutateError.message);
      return;
    }
    setResponseError("");

    if (mutateStatus === "success" && !!mutateData) {
      console.log("data:", mutateData);
      SetSecret(mutateData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutateStatus, mutateData, mutateError]);

  const onCheckCred = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    console.log("active url: ", tab.url);
    if (!!tab.url && !!account) {
      const url = new URL(tab.url);
      const appLink = url.hostname;
      console.log("appLink: ", appLink);
      mutate({ appLink, address: account, provider });
    }
  };

  return (
    <>
      <div>
        <img src={BnbPass} className="logo mx-auto" alt="bnb pass logo" />
      </div>
      <h1 className="text-3xl font-semibold">BNB Pass</h1>
      <div className="card">
        {(!!error || !!responseError) && (
          <Alert severity="error" className="mb-2">
            {error ? error : responseError}
          </Alert>
        )}
        <button
          className="cstm-button"
          onClick={() => onClickConnect()}
          disabled={isLoading || isPending}
        >
          {account ? getMaskedAddress(account) : "Connect Wallet"}
        </button>
        <button
          className="cstm-button"
          onClick={() => onCheckCred()}
          disabled={isLoading || isPending || !!error}
        >
          Check Creds for this Tab
        </button>
        {!!secret && (
          <div className="flex flex-col gap-4">
            <UserField name="Username" value={secret.user} />
            <PasswordField name="Password" value={secret.password} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
