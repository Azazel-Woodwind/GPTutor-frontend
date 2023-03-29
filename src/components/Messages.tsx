import React from "react";

type MessageProps = {
  type: string;
  message: string;
};

export default function Messages({ type, message }: MessageProps) {
  return (
    <div
      className={`flex  space-x-3 p-3 rounded-[7px]  ${
        type === "sophia" && "bg-white/10"
      } `}
    >
      <button
        className={`rounded-[7px] font-abel ${
          type === "sophia"
            ? "bg-gradient-to-r from-cyan-300 to-blue-600 w-[32px] h-[32px] rounded-[12px] flex items-center justify-center text-white "
            : "bg-white w-[32px] h-[32px] rounded-[12px] flex items-center justify-center"
        }`}
      >
        {type === "sophia" ? `X` : `J`}
      </button>
      <p className="text-[16px] text-white font-abel pt-1.5 flex-1">{message}</p>
    </div>
  );
}
