import { AccountBalanceWallet } from "@mui/icons-material";
import CustomButton from "../CustomButton";
import { getMaskedAddress } from "../../utils";
import { useContext } from "react";
import {
  Web3DispatchContext,
  Web3ProviderContext,
} from "../../contexts/Web3Context";

const ConnectWallet = () => {
  const { account, isLoading } = useContext(Web3ProviderContext) || {};
  const { connect } = useContext(Web3DispatchContext) || {};

  console.log("account: ", account);

  return (
    <>
      <CustomButton
        startIcon={<AccountBalanceWallet />}
        onClick={connect}
        disabled={isLoading}
      >
        {account ? getMaskedAddress(account) : "Connect Wallet"}
      </CustomButton>
    </>
  );
};

export default ConnectWallet;
