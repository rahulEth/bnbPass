import { useState } from "react";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CopyBtn from "../CopyBtn";
import "./style.css";
export interface FieldProps {
  name: string;
  value: React.ReactNode;
}

const PasswordField = ({ name, value }: FieldProps) => {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="flex flex-col font-medium hover:bg-gray-200 rounded p-2">
      <div className="text-slate-500 text-sm">{name}</div>
      <div className="text-slate-900 text-base grid grid-cols-10 gap-1 place-items-center">
        <div
          className={`col-span-8 text-wrap break-all ${
            !showPwd ? "password_field" : ""
          }`}
        >
          {value}
        </div>
        <IconButton className="col-span-1" onClick={() => setShowPwd(!showPwd)}>
          {!showPwd ? (
            <VisibilityOff className="!h-5 !w-auto" color="action" />
          ) : (
            <Visibility className="!h-5 !w-auto" color="action" />
          )}
        </IconButton>
        <CopyBtn data={value as string} className="col-span-1" />
      </div>
    </div>
  );
};

export default PasswordField;
