import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const clerkFrontendApi = "pk_test_c3VidGxlLW1vbmtmaXNoLTQ0LmNsZXJrLmFjY291bnRzLmRldiQ";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <ClerkLoaded>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkLoaded>
    </ClerkProvider>
  </React.StrictMode>
);
