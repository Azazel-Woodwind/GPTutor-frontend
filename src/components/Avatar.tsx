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
        className={`rounded-full bg-white/20  border inset-[0px] ${
          isAnimate && "animate-ping"
        }   absolute`}
      />
      <div
        className={`rounded-full bg-white/30 border inset-[30px] ${
          isAnimate && "animate-ping"
        }   absolute`}
      />
      <div
        className={`rounded-full bg-white/40 border inset-[60px] ${
          isAnimate && "animate-ping"
        } absolute`}
      />
      <div
        className={` rounded-full bg-white/20 border inset-[90px] ${
          isAnimate && "animate-pulse"
        }  absolute`}
      />
    </div>
  );
}
