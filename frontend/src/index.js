import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import ChatProvider from "./context/chatprovider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <BrowserRouter>
      <App>
        <ToastContainer />
        <ReactTooltip />
      </App>
    </BrowserRouter>
  </ChatProvider>,
  document.getElementById("root")
);
