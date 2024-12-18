import { PropsWithChildren } from "react";

const MainBody = ({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={`col-span-full sm:col-start-2 sm:col-span-10 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default MainBody;
