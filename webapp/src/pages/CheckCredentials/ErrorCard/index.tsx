import { Card } from "@mui/material";
import { PropsWithChildren } from "react";

const ErrorCard = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className=" col-span-full sm:col-start-2 sm:col-span-10 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6 p-6 rounded-lg border border-rose-300">
        {children}
      </Card>
    </div>
  );
};

export default ErrorCard;
