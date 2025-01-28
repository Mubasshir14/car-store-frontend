import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { persistor, store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import router from "./routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider  store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider  router={router} />
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>
);
