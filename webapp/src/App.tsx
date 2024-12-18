import "./App.css";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import SaveCredentials from "./pages/SaveCredentials";
import CheckCredentials from "./pages/CheckCredentials";
import { ROUTING_PATH } from "./constants";
import HomePageLayout from "./layout/HomePageLayout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path={ROUTING_PATH.HOME} element={<HomePageLayout />}>
        <Route index element={<Home />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route
            path={ROUTING_PATH.CHECK_CREDS}
            element={<CheckCredentials />}
          />
          <Route path={ROUTING_PATH.SAVE_CREDS} element={<SaveCredentials />} />
        </Route>
      </Route>
      {/* default redirect to home page */}
      <Route path="*" element={<Navigate to={ROUTING_PATH.HOME} />} />
    </Routes>
  );
}

export default App;
