import { Card } from "@mui/material";
import CredIcon from "../CredIcon";
import { CredDetails } from "../CredDetailsCard";

export interface CredInfoCardProps
  extends Pick<CredDetails, "encryptedUser" | "type" | "appLink"> {
  onCardClick?: () => void;
  className?: string;
}

const CredInfoCard = ({
  type,
  appLink,
  encryptedUser,
  onCardClick,
  className = "",
}: CredInfoCardProps) => {
  return (
    <Card
      className={`${!!onCardClick ? "cursor-pointer" : ""} ${className}`}
      onClick={() => !!onCardClick && onCardClick()}
    >
      <div className="flex items-center p-4 gap-4">
        <CredIcon type={type} />
        <div className="flex flex-col font-medium">
          <div className="text-slate-900">{appLink}</div>
          <div className="text-slate-500">{encryptedUser}</div>
        </div>
      </div>
    </Card>
  );
};

export default CredInfoCard;
