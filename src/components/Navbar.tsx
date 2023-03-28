import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo";
import Header from "./Header/header";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between text-white">
      <Header />
      <div className="flex items-center space-x-8">
        <Link className="text-white font-abel text-lg" to="">
          Home
        </Link>
        <Link className="text-white font-abel text-lg" to="">
          Settings
        </Link>
      </div>
    </div>
  );
}
