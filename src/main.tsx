import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import Header from "./components/Header/header";
import { UserContextProvider } from "./context/UserContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <div className="relative bg-[#040A1E]">
        <div className="bg-[#3750C0] hidden md:block absolute bottom-[0px] left-0 blur-[382px] w-[600px] h-[300px]" />
        <div className="bg-[#217DB0] hidden md:block absolute rounded-full -top-[190px] left-[calc(50%-500px/2-81px)] blur-[382px] w-[500px] h-[500px]" />
        <Router />
      </div>
    </UserContextProvider>
  </React.StrictMode>
);
