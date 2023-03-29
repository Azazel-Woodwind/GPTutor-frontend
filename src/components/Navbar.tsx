import React, { useState } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoBulbOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo";
import Header from "./Header/header";

export default function Navbar({
  showHeader = false,
}: {
  showHeader?: boolean;
}) {
  const [active, setActive] = useState("home");
  return (
    <div className="flex  items-center justify-between text-white relative">
      <Header />
      <div className="flex items-center space-x-8">
        <Link className="text-white font-abel text-lg" to="">
          Home
        </Link>
        <Link className="text-white font-abel text-lg" to="">
          Settings
        </Link>
      </div>
      <div
        className={`${
          !showHeader && "hidden"
        } absolute py-3 rounded-b-lg top-0 left-[calc(50%-100px)]  w-[250px] flex items-center justify-around border border-t-0 border-[#50576E]`}
      >
        <button onClick={() => setActive("home")}>
          <BiHomeSmile
            size={20}
            color={`${active === "home" ? "#24AAFF" : "#fff"}`}
          />
        </button>
        <button onClick={() => setActive("bulb")}>
          <FiSettings
            size={20}
            color={`${active === "bulb" ? "#24AAFF" : "#fff"}`}
          />
        </button>
        <button onClick={() => setActive("setting")}>
          <IoBulbOutline
            size={20}
            color={`${active === "setting" ? "#24AAFF" : "#fff"}`}
          />
        </button>
      </div>
    </div>
  );
}
