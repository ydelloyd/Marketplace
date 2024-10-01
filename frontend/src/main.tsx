import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { AlertProvider } from "./app/contexts/alertContext";
import { LoaderProvider } from "./app/contexts/loaderContext";
import { BrowserRouter } from "react-router-dom";

import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </AlertProvider>
    </BrowserRouter>
  </StrictMode>
);
