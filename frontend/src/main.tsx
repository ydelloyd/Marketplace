import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { AlertProvider } from "./app/contexts/alertContext";
import { LoaderProvider } from "./app/contexts/loaderContext";

import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <AlertProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </AlertProvider>
  </StrictMode>
);
