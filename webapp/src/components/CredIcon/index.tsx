import { Avatar } from "@mui/material";
import { CredType } from "../../enums/CredTypeEnums";
import { CredInfoCardProps } from "../CredInfoCard";
import {
  AccountBalance,
  LockPerson,
  Public,
  Wysiwyg,
} from "@mui/icons-material";

const CredIcon = ({ type }: Pick<CredInfoCardProps, "type">) => {
  switch (type) {
    case CredType.BANKING:
      return (
        <Avatar className="!bg-amber-300">
          <AccountBalance />
        </Avatar>
      );

    case CredType.PERSONAL:
      return (
        <Avatar className="!bg-rose-400">
          <LockPerson />
        </Avatar>
      );
    case CredType.SOCIAL:
      return (
        <Avatar className="!bg-sky-300">
          <Public />
        </Avatar>
      );

    default:
      return (
        <Avatar>
          <Wysiwyg />
        </Avatar>
      );
  }
};

export default CredIcon;
