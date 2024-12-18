import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Web3ProviderContext } from "../../contexts/Web3Context";

const RequireAuth = () => {
  const location = useLocation();

  const { account } = useContext(Web3ProviderContext) || {};

  return !!account ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
