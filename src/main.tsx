import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Base layers first: component stylesheets are bundled in import order, so these
// must load before App or component rules lose to the shared .btn/.chip/.card
// rules of equal specificity.
import "./styles/tokens.css";
import "./styles/global.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
