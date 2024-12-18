import GitHubIcon from "@mui/icons-material/GitHub";

export interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer
      className={`bg-slate-900 border rounded border-slate-200 ${className}`}
    >
      <div className="mx-auto max-w-screen-xl flex flex-col md:flex-row items-center justify-between px-6 py-12 lg:px-8 text-gray-300 gap-2">
        <div className="flex gap-1 items-center justify-start lg:justify-end order-1 md:order-2">
          <GitHubIcon color="primary" sx={{ color: "slategray" }} />
        </div>
        <div className="text-sm order-2 md:order-1">Developed by ZK Sec</div>
      </div>
    </footer>
  );
};

export default Footer;
