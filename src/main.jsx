import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import AuthProvider from "./context/AuthContext";
import ConversationProvider from './context/ConversationContext.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ConversationProvider>
      <App />
      </ConversationProvider>
    </AuthProvider>
  </React.StrictMode>
);
