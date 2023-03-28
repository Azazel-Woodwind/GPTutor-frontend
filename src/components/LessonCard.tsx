import React from "react";
import LessonRound from "./Header/LessonRound";

type PropsTypes = {
  title: string;
  info: string;
  color: string;
};

export default function LessonCard({ title, info, color }: PropsTypes) {
  return (
    <div className="w-full min-h-[125px] px-8 py-8 rounded-lg bg-opacity-60 backdrop-blur-md  drop-shadow-lg  bg-[#2D425C] relative overflow-hidden">
      <h3 style={{ color: color }} className={`text-[22px] font-abel  mb-2`}>
        {title}
      </h3>
      <h4 className="text-[16px] font-abel text-white">{info}</h4>
      <LessonRound />
    </div>
  );
}
