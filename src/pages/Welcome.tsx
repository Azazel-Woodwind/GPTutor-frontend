import React from "react";
import Navbar from "../components/Navbar";
import { BiMicrophone } from "react-icons/bi";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { BsChevronUp } from "react-icons/bs";
import Avatar from "../components/Avatar";

export default function Welcome() {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col">
      <div className="mx-auto mt-8 md:block hidden">
        <Avatar isAnimate={true} style="w-[375px] h-[375px] " />
      </div>

      <div className="mt-auto">
        <h3 className="text-white font-abel md:text-[52px] text-[36px] text-center mb-10">
          Welcome Back, Sophia!
        </h3>
        <div
          style={{ background: "rgba(255, 255, 255, 0.06) " }}
          className="relative max-w-[1100px] border  rounded-t-[30px] border-slate-500 border-b-0  md:p-8 p-2 pt-10 mx-auto flex items-center space-x-2.5"
        >
          <div className="flex items-center justify-center top-2 left-[49%] absolute">
            <BsChevronUp
              style={{ strokeWidth: "1" }}
              color="#898C97"
              cursor="pointer"
              size={20}
            />
          </div>
          <div className="flex items-center space-x-4 border border-cyan-400 p-1  rounded-[16px] flex-1 md:mr-3 ">
            <button className="bg-gradient-to-r from-[#58E3FE] to-[#227CFF] w-[42px] h-[42px] rounded-[12px] flex items-center justify-center">
              <BiMicrophone color="#fff" size={24} />
            </button>
            <input
              type="text"
              className="flex-1 border-none outline-none h-full bg-transparent font-abel text-white text-lg"
            />
          </div>
          <button className="bg-gradient-to-r from-[#58E3FE] to-[#227CFF] w-[42px] h-[42px] rounded-[12px] flex items-center justify-center">
            <IoMdSend color="#fff" size={24} />
          </button>
          <p className="bg-gradient-to-r from-[#58E3FE] to-[#227CFF] inline-block text-transparent bg-clip-text border-[2px] border-cyan-500 h-[42px] w-[42px] text-center pt-[2px] text-xl rounded-[12px] cursor-pointer">
            x
          </p>
        </div>
      </div>
    </div>
  );
}
