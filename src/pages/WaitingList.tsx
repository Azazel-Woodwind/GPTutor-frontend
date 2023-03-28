import React from "react";

function WaitingList() {
  return (
    <div className="max-w-[1100px] mx-auto h-screen text-white px-6 py-28">
      <div className="flex items-center justify-between space-x-20  ">
        <div className=" mx-auto text-center flex-1">
          <h1 className="font-lora font-[500]  text-[120px] text-white ">
            xtutor
          </h1>
          <h6 className="text-[42px] font-normal mb-2 font-abel">
            Hello Sophia.
          </h6>
        </div>
        <div className="flex flex-col flex-1 font-abel max-w-[400px] ">
          <h3 className="text-[40px] text-center mb-3">Join Waiting List.</h3>
          <div className="flex flex-col space-y-1 mb-3">
            <label className="text-[20px]">Name</label>
            <input
              type="text"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-1"
            />
          </div>
          <div className="flex flex-col space-y-1 mb-3">
            <label className="text-[20px]">Email</label>
            <input
              type="email"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-1"
            />
          </div>
          <div className="flex space-x-3 items-center mb-3">
            <div className="flex w-full flex-col space-y-1">
              <label className="text-[20px]">Ed-level</label>
              <input
                type="text"
                className="bg-transparent outline-none border border-white rounded-lg px-2 py-1"
              />
            </div>
            <div className="flex w-full flex-col space-y-1">
              <label className="text-[20px]">Subject/s</label>
              <input
                type="email"
                className="bg-transparent outline-none border border-white rounded-lg px-2 py-1"
              />
            </div>
          </div>
          <button className="bg-gradient-to-r from-[#58fec4] to-blue-500 rounded-lg py-2 mt-2 text-black">{`>>>>>`}</button>
        </div>
      </div>
      <div className="flex  ">
        <p className="font-abel text-[26px] font-normal flex-1 text-center ">
          Support the xtutor Vision,{" "}
          <span className="underline">Read more</span>
        </p>
        <div className="flex-1" />
      </div>
    </div>
  );
}

export default WaitingList;
