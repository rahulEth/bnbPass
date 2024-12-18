import { Button } from "@mui/material";
import CustomModal, { CustomModalProps } from "../CustomModal";

export interface ConnectWalletModalProps
  extends Pick<CustomModalProps, "open" | "handleClose"> {}

const ConnectWalletModal = ({ open, handleClose }: ConnectWalletModalProps) => {
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex flex-col gap-6">
        <div className="text-base font-semibold">
          Please Connect Your Wallet to use this Service
        </div>
        <div className="flex justify-end p-2">
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConnectWalletModal;
