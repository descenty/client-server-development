import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "./auth.ts";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NextUIProvider>
        </QueryClientProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
