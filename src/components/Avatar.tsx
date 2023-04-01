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
        className={`rounded-full  border inset-[0px] duration-300 check1 absolute border-b-0 `}
      />
      <div
        id={isAnimate ? "animation-ping" : ""}
        className={`rounded-full  border inset-[45px] duration-300 check2 absolute border-b-0 check2`}
      />
      <div
        id={isAnimate ? "animation-ping" : ""}
        className={`rounded-full border inset-[90px] duration-300 check3 absolute border-b-0 check3`}
      />
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
        className={` rounded-full  border border-b-0 inset-[135px] ${
          isAnimate && "animate-pulse"
        }  absolute`}
      />
    </div>
  );
}

// import React from "react";
// import "./avatar.css";

// export default function Avatar({
//   style,
//   isAnimate = true,
// }: {
//   style: string;
//   isAnimate?: boolean;
// }) {
//   return (
//     <div className={`${style} rounded-full relative opacity-50 `}>
//       <div
//         id={isAnimate ? "animation-ping" : ""}
//         className={`rounded-full bg-white/20  border inset-[0px] check1 duration-300 absolute`}
//       />
//       <div
//         id={isAnimate ? "animation-ping" : ""}
//         className={`rounded-full bg-white/30 border inset-[30px] check2 duration-300 absolute`}
//       />
//       <div
//         id={isAnimate ? "animation-ping" : ""}
//         className={`rounded-full bg-white/40 border inset-[60px] check3 duration-300 absolute`}
//       />
//       <div
//         className={` rounded-full bg-white/20 border inset-[90px] ${
//           isAnimate && "animate-pulse"
//         }  absolute`}
//       />
//     </div>
//   );
// }
