import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import Header from "./components/Header/header";
import { UserContextProvider } from "./context/UserContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <div className="bg-[#040A1E]">
        <Router />
      </div>
    </UserContextProvider>
  </React.StrictMode>
);
