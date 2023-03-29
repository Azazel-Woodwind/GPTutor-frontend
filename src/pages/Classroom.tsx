import React, { useState, useRef, useEffect } from "react";

import Rectangle from "../assets/Rectangle";
import RoundedLine from "../assets/RoundedLine";
import Chevron from "../assets/icons/Chevron";
import image from "../assets/neurons.png";
import Navbar from "../components/Navbar";
import nurons from "../assets/neurons.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  BsChevronDoubleDown,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import Messages from "../components/Messages";
import { BiMicrophone } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";

import "./searchLeson.css";
import Avatar from "../components/Avatar";

export interface ChatEntry {
  source: string;
  text: string;
}

export default function Classroom() {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <div className="min-h-screen  flex flex-col">
      <div className="px-20">
        <Navbar />
      </div>

      <div
        className={`max-w-[1100px] w-[1100px] flex flex-col  mx-auto  relative h-full mt-auto`}
      >
        <div className={`flex space-x-3 h-[420px] ${isCollapse && "hidden"}`}>
          <div className="flex-1">
            <Avatar style="w-[250px] h-[250px] ml-10 mt-14" />
          </div>
          <div className="w-[600px] relative">
            <div className="relative">
              <Rectangle
                style={{ position: "absolute", height: "44px", width: "100%" }}
              />
              <p className="font-abel text-[16px] text-white absolute text-center left-0 right-0 top-[10px] ">
                GCSE | Cellular Biology - The Nerve Cell
              </p>
            </div>
            <div className="relative ">
              <RoundedLine style={{ position: "absolute", top: "22px" }} />
              <div className="absolute">
                <div className="p-6 relative pt-16">
                  <img src={nurons} className="w-full h-full rounded-xl " />
                  <div className="absolute -left-5 top-[49%] w-[65px] h-[65px] bg-[#131E2F]/90 rounded-full flex items-center justify-center">
                    <FaChevronLeft size={20} color="white " />
                  </div>
                  <button className="absolute -right-5 top-[49%] w-[65px] h-[65px] bg-[#131E2F]/90 rounded-full flex items-center justify-center">
                    <FaChevronRight size={20} color="white " />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ background: "rgba(255, 255, 255, 0.06) " }}
          className={`transition-all duration-500 ease-in-out relative max-w-[1100px] border  rounded-t-[30px] border-slate-500 border-b-0  px-8 pt-10 pb-20 ${
            isCollapse ? "h-[calc(100vh-120px)]  " : "h-[280px]"
          }  overflow-hidden`}
        >
          <button
            onClick={() => setIsCollapse(!isCollapse)}
            className="absolute top-2 left-[49%]"
          >
            {isCollapse ? (
              <BsChevronDown color="#898C97" cursor="pointer" size={20} />
            ) : (
              <BsChevronUp color="#898C97" cursor="pointer" size={20} />
            )}
          </button>
          <div id="scroll" className="h-full pr-2  overflow-y-scroll">
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone? "
              type="sophia"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone?"
              type="user"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone? "
              type="sophia"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone?"
              type="user"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone? "
              type="sophia"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone?"
              type="user"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone? "
              type="sophia"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone?"
              type="user"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone? "
              type="sophia"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone?"
              type="user"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone? "
              type="sophia"
            />
            <Messages
              message="Sophia, do you think you've understood the structure and functionality of a Neurone?"
              type="user"
            />
          </div>
          <div className="flex items-center space-x-2 absolute left-8 right-8 bottom-2">
            <div className="flex items-center space-x-4 border border-cyan-400 p-1  rounded-[16px] flex-1 mr-3">
              <button className="bg-gradient-to-r from-cyan-300 to-blue-600 w-[42px] h-[42px] rounded-[12px] flex items-center justify-center">
                <BiMicrophone color="#fff" size={24} />
              </button>
              <input
                type="text"
                className="flex-1 border-none outline-none h-full bg-transparent font-abel text-white text-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-cyan-300 to-blue-600 w-[42px] h-[42px] rounded-[12px] flex items-center justify-center">
              <IoMdSend color="#fff" size={24} />
            </button>
            <p className="bg-gradient-to-r from-cyan-300 to-blue-600 inline-block text-transparent bg-clip-text border-[2px] border-cyan-500 h-[42px] w-[42px] text-center pt-[2px] text-xl rounded-[12px] cursor-pointer">
              x
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
