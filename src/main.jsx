import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import {
  AuthProvider,
  ConversationProvider,
  FullScreenImageProvider,
} from "./context/indexContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ConversationProvider>
        <FullScreenImageProvider>
          <App />
        </FullScreenImageProvider>
      </ConversationProvider>
    </AuthProvider>
  </React.StrictMode>
);
