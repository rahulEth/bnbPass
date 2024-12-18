import { Box, Modal } from "@mui/material";
import { PropsWithChildren } from "react";

export interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  label?: string;
  description?: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #e6e6e6",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CustomModal = ({
  children,
  open,
  handleClose,
  label = "",
  description = "",
}: PropsWithChildren<CustomModalProps>) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={label}
      aria-describedby={description}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
