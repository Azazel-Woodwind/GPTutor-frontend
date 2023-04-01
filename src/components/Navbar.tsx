import React, { useState } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoBulbOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo";
import Header from "./Header/header";

export default function Navbar({
  showHeader = false,
  userType = null,
}: {
  showHeader?: boolean;
  userType?: string | null;
}) {
  const [active, setActive] = useState("home");

  return (
    <div className="flex h-[100px]  items-center justify-between text-white relative md:px-4 md:pr-14 px-4 ">
      {userType !== null && <Header />}
      {userType === null && (
        <div className="flex items-center space-x-8 py-5 ml-auto">
          <Link className="text-white font-abel text-lg" to="/login">
            Login
          </Link>
          <Link className="text-white font-abel text-lg" to="/register">
            Register
          </Link>
        </div>
      )}
      {userType === "student" && (
        <div className="flex items-center space-x-8">
          <Link className="text-white font-abel text-lg" to="/searchLesson">
            Lesson
          </Link>
        </div>
      )}
      {(userType === "teacher" || userType === "admin") && (
        <button className="bg-gradient-to-r from-[#58E3FE] to-[#227CFF] px-4 py-1.5 rounded-md ">
          <Link
            className="text-white font-abel text-lg font-bold"
            to="/create-lesson"
          >
            Create Lesson
          </Link>
        </button>
      )}
      {/* <div
        className={`${
          !showHeader && "hidden"
        } absolute py-3 rounded-b-lg top-0 left-[calc(50%-100px)] hidden  w-[250px] md:flex items-center justify-around border border-t-0 border-[#50576E]`}
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
      </div> */}
    </div>
  );
}
