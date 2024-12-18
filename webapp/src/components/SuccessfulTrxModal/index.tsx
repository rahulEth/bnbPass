import CustomModal, { CustomModalProps } from "../CustomModal";
import { UseMutationSaveCredentialsRes } from "../../api";
import CustomButton from "../CustomButton";
import { useNavigate } from "react-router-dom";
import { ROUTING_PATH } from "../../constants";
import { ReactNode } from "react";

export interface TwoSideTextProps {
  leftText: ReactNode;
  rightText: ReactNode;
}

const TwoSideText = ({ leftText, rightText }: TwoSideTextProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="text-slate-500 text-lg font-semibold break-all">
        {leftText}
      </div>
      <div className="text-slate-900 text-base break-all">{rightText}</div>
    </div>
  );
};

export interface SuccessfulTrxModalProps
  extends Pick<CustomModalProps, "open" | "handleClose"> {
  data?: UseMutationSaveCredentialsRes;
}

const SuccessfulTrxModal = ({
  open,
  handleClose,
  data,
}: SuccessfulTrxModalProps) => {
  console.log(data);
  const navigate = useNavigate();

  const goToCheckCreds = () => {
    handleClose();
    navigate(ROUTING_PATH.CHECK_CREDS);
  };

  const ipfsHash = data?.ipfsHash.at(0)?.path || "";

  return (
    <CustomModal open={open} handleClose={handleClose}>
      <div className="flex flex-col gap-6">
        <div className="text-lg text-center font-semibold text-teal-400">
          Your Secrets Saved Successfully!
        </div>
        <TwoSideText
          leftText="URL:"
          rightText={
            <ExternalLink
              title={data?.appLink || ""}
              url={data?.appLink || ""}
            />
          }
        />
        <TwoSideText
          leftText="IPFS Hash:"
          rightText={<ExternalLink title={ipfsHash} url={ipfsHash} />}
        />
        <CustomButton
          className="!rounded-full !text-lg !py-3"
          onClick={goToCheckCreds}
        >
          Check Credentials
        </CustomButton>
        <CustomButton
          variant="outlined"
          className="!rounded-full !text-lg !py-3"
          onClick={handleClose}
        >
          Ok
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export const ExternalLink = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => {
  return (
    <a href={url} target="_blank" className="text-blue-600 underline">
      {title}
    </a>
  );
};

export default SuccessfulTrxModal;
