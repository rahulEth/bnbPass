import { ContentCopy, Done } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const writeClipboardText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error((error as Error).message);
  }
};

const CopyBtn = ({
  data,
  className = "",
}: {
  data: string;
  className?: string;
}) => {
  const [coping, setCoping] = useState(false);

  const onClickCopy = async (data: string) => {
    setCoping(true);
    await writeClipboardText(data);
    setTimeout(() => setCoping(false), 500);
  };

  return (
    <IconButton
      onClick={() => onClickCopy(data)}
      disabled={coping}
      className={className}
    >
      {!coping ? (
        <ContentCopy className="!h-5 !w-auto" color="action" />
      ) : (
        <Done className="!h-5 !w-auto" color="success" />
      )}
    </IconButton>
  );
};

export default CopyBtn;
