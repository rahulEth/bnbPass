import { Button, ButtonProps } from "@mui/material";

const CustomButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      className={`!normal-case ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
