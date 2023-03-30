import React from "react";
import "./avatar.css";

export default function Avatar({
  style,
  isAnimate = false,
}: {
  style: string;
  isAnimate?: boolean;
}) {
  return (
    <div className={`${style} rounded-full relative opacity-50 `}>
      <div
        id={isAnimate ? "animation-ping" : ""}
        className={`rounded-full bg-white/20  border inset-[0px] duration-300 absolute`}
      />
      <div
        id={isAnimate ? "animation-ping" : ""}
        className={`rounded-full bg-white/30 border inset-[30px] duration-300 absolute`}
      />
      <div
        id={isAnimate ? "animation-ping" : ""}
        className={`rounded-full bg-white/40 border inset-[60px] duration-300 absolute`}
      />
      <div
        className={` rounded-full bg-white/20 border inset-[90px] ${
          isAnimate && "animate-pulse"
        }  absolute`}
      />
    </div>
  );
}
