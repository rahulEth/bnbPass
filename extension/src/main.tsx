import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Web3Provider from "./contexts/Web3Context.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Web3Provider>
  </StrictMode>
);
