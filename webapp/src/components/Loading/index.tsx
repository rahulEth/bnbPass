import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="!col-span-full h-[calc(100vh-18rem)] w-full flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default Loading;
