import {
  Download as DownloadIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ConnectWallet from "../ConnectWallet";
import CustomButton from "../CustomButton";
import { Link } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={`bg-gray-50 border rounded-b-md ${className}`}>
      <nav
        aria-label="Global"
        className="mx-auto max-w-screen-xl flex items-center justify-between px-6 py-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">BNB Pass</span>
            <img alt="" src="bnb-pass.svg" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex flex-1 justify-end gap-2">
          <CustomButton
            className="!hidden md:!inline-flex"
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Download Extension
          </CustomButton>
          <ConnectWallet />
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex md:hidden -m-2.5  items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* TODO: to be replaced with extensionn link redirection */}
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            Download Extension
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
