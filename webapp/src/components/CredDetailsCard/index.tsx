import { Card } from "@mui/material";
import CredIcon from "../CredIcon";
import Field from "./components/Field";
import PasswordField from "./components/PasswordField";
import "./style.css";
import { UseQueryGetCredentialsByTypeRes } from "../../api";
import { ExternalLink } from "../SuccessfulTrxModal";
export interface CredDetails extends UseQueryGetCredentialsByTypeRes {}

export interface CredDetailsCardProps {
  creds?: CredDetails;
  onCardClick?: () => void;
  className?: string;
}

const CredDetailsCard = ({ creds, className = "" }: CredDetailsCardProps) => {
  return (
    <Card className={`cursor-pointer p-6 w-full ${className}`}>
      {!!creds ? (
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-row items-center gap-4 p-2">
            <CredIcon type={creds.type} />
            <div className="text-slate-900 font-bold text-lg">
              {creds.appLink}
            </div>
          </div>
          <Field name="Username" value={creds.encryptedUser} />
          <PasswordField name="Password" value={creds.encryptedPassword} />
          <Field
            name="Trx Hash"
            value={<ExternalLink title={creds.txHash} url={creds.txHash} />}
          />
        </div>
      ) : (
        <div className="text-center text-slate-500 min-h-72">
          Please Select Creds to see details
        </div>
      )}
    </Card>
  );
};

export default CredDetailsCard;
