import React, { useState, useRef, useEffect } from "react";

import Rectangle from "../assets/Rectangle";
import RoundedLine from "../assets/RoundedLine";
import Chevron from "../assets/icons/Chevron";
import image from "../assets/neurons.png";
import Navbar from "../components/Navbar";
import nurons from "../assets/neurons.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface ChatEntry {
  source: string;
  text: string;
}

export default function Classroom() {
  return (
    <div className="min-h-screen">
      <div className="px-20">
        <Navbar />
      </div>

      <div className="max-w-[1100px] mx-auto">
        <div className="flex space-x-3">
          <div className="w-[300px]"></div>
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
                    <FaChevronLeft color="white " />
                  </div>
                  <div className="absolute -right-5 top-[49%] w-[65px] h-[65px] bg-[#131E2F]/90 rounded-full flex items-center justify-center">
                    <FaChevronRight color="white " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
