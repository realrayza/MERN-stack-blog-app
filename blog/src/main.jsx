import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { BlogContextProvider } from "./Context/BlogContextProvider.jsx";
import { UserContextProvider } from "./Context/UserContextProvider.jsx";
import { DraftContextProvider } from "./Context/DraftContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DraftContextProvider>
      <UserContextProvider>
        <BlogContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BlogContextProvider>
      </UserContextProvider>
    </DraftContextProvider>
  </StrictMode>,
);
