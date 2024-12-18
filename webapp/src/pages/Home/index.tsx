import { Card } from "@mui/material";

// import SecurityFlag from "./assets/security-flag.svg?react";
import CredStorage from "./assets/cred-storage.svg?react";
import { useNavigate } from "react-router-dom";
import { ROUTING_PATH } from "../../constants";
import ConnectWalletModal from "../../components/ConnectWalletModal";
import { useContext } from "react";
import { Web3ProviderContext } from "../../contexts/Web3Context";
import useModal from "../../hooks/useModal";

const Home = () => {
  const navigate = useNavigate();
  const { account } = useContext(Web3ProviderContext) || {};
  const { open, handleOpen, handleClose } = useModal();

  const onClickSaveCredentials = () => {
    if (!account) {
      console.log("trigger open");

      handleOpen();
      return;
    }
    navigate(ROUTING_PATH.SAVE_CREDS);
  };

  const onClickCheckCredentials = () => {
    if (!account) {
      console.log("trigger open");

      handleOpen();
      return;
    }
    navigate(ROUTING_PATH.CHECK_CREDS);
  };

  return (
    <div className="col-span-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-stretch bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% !text-white rounded-xl">
        <div className="basis-1/2 bg-white/[0.3] rounded-b-3xl md:rounded-bl-none md:rounded-r-full">
          <CredStorage className="h-96 w-96" />
        </div>
        <div className="basis-1/2 text-3xl md:text-4xl p-4 text-center md:text-right">
          {" "}
          Your Credentials, Your Control – Trustless and Non-Custodial Security
          on BNB
        </div>
      </div>
      <div className="flex items-center justify-around gap-8 !bg-sky-100 p-6 rounded-lg">
        <Card
          className="p-4 !bg-gradient-to-r from-cyan-500 to-blue-500 !text-white font-semibold cursor-pointer"
          onClick={onClickCheckCredentials}
        >
          Check Your Credentials
        </Card>
        <Card
          className="p-4 !bg-gradient-to-r from-cyan-500 to-blue-500 !text-white font-semibold cursor-pointer"
          onClick={onClickSaveCredentials}
        >
          Save Your Credentials
        </Card>
      </div>
      <ConnectWalletModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Home;
