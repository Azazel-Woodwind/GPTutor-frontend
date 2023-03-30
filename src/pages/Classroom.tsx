import React, { useState, useRef, useEffect } from "react";
import Rectangle from "../assets/Rectangle";
import RoundedLine from "../assets/RoundedLine";
import Navbar from "../components/Navbar";
import nurons from "../assets/neurons.png";
import neucleus from "../assets/nucleus.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Messages from "../components/Messages";
import { BiMicrophone } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import "./searchLeson.css";
import Avatar from "../components/Avatar";
import { Resizable } from "re-resizable";

export default function Classroom() {
  const [isCollapse, setIsCollapse] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const images = [nurons, neucleus];
  const [heightScreen, setHeightScreen] = useState(0);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setHeightScreen(height);
  }, []);

  const onImageChange = (num: number) => {
    if (imageCount === images.length - 1 && num === 1) {
      setImageCount(0);
    } else if (imageCount === 0 && num === -1) {
      setImageCount(images.length - 1);
    } else {
      setImageCount(prev => num + prev);
    }
  };

  console.log("Image count", imageCount);

  return (
    <div className="min-h-screen overflow-hidden  flex flex-col relative">
      <div className="md:px-20 px-4">
        <Navbar />
      </div>

      <div
        className={`max-w-[1100px] md:w-[1100px] flex flex-col   mx-auto  relative h-full md:mt-auto mt-14 flex-1 `}
      >
        <div
          className={`flex  md:space-x-3 md:h-[420px] h-[375px]  ${
            isCollapse && "hidden"
          }`}
        >
          <div className="flex-1 md:block hidden ">
            <Avatar style="w-[250px] h-[250px] ml-10 mt-14" />
          </div>
          <div className="md:w-[595px] w-[370px] relative mx-auto">
            <div className="relative md:w-full w-[276px] mx-auto">
              <Rectangle
                style={{ position: "absolute", height: "44px", width: "100%" }}
              />
              <p className="font-abel md:text-[16px] text-[12px] text-white absolute text-center left-0 right-0 md:top-[10px] top-[14px] ">
                GCSE | Cellular Biology - The Nerve Cell
              </p>
            </div>
            <div className="relative ">
              <RoundedLine style={{ position: "absolute", top: "22px" }} />
              <div className="absolute">
                <div className="md:p-6 p-3.5 relative md:pt-16 pt-14">
                  <img
                    src={images[imageCount]}
                    className="w-full h-full rounded-xl "
                  />
                  <button
                    onClick={() => onImageChange(-1)}
                    className="absolute md:text-[20px] text-[16px] -left-5 top-[49%] md:w-[65px] md:h-[65px] w-[50px] h-[50px] bg-[#131E2F]/90 rounded-full flex items-center justify-center"
                  >
                    <FaChevronLeft color="white " />
                  </button>
                  <button
                    onClick={() => onImageChange(1)}
                    className="absolute md:text-[20px] text-[16px] -right-5 top-[49%] md:w-[65px] md:h-[65px] w-[50px] h-[50px] bg-[#131E2F]/90 rounded-full flex items-center justify-center"
                  >
                    <FaChevronRight color="white " />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Resizable
          enable={{
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
            top: true,
          }}
          style={{
            background: "#040A1E ",
            position: "absolute",
          }}
          className={`transition-all bottom-2 top-0   mt-auto ease-in-out  md:max-w-[1100px] max-w-[400px] border  rounded-t-[30px] border-slate-500 border-b-0  md:px-8 px-2 pt-10 pb-20 ${
            isCollapse ? "h-[calc(100vh-120px)]  " : "h-[280px]"
          }  overflow-hidden`}
          defaultSize={{
            width: "100%",
            height: 300,
          }}
          maxHeight={heightScreen - 85}
        >
          <button className="absolute top-2 left-[49%]">
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
          <div className="flex items-center space-x-2 absolute md:left-8 md:right-8 left-2 right-2 bottom-2">
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
        </Resizable>
      </div>
    </div>
  );
}
