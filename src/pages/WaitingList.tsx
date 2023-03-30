import React, { useState } from "react";
import Avatar from "../components/Avatar";
import DropDownList from "../components/DropDownList";
import MultiSelect from "../components/MultiSelect";
import { eduLevel, subjects } from "../Data";

function WaitingList() {
  const [education, setEducation] = useState("");
  const [subject, setSubject] = useState([]);
  return (
    <div className="max-w-[1100px] mx-auto flex flex-col  h-screen text-white px-6 pt-28 pb-4">
      <div className="flex items-center justify-between space-x-20  ">
        <div className=" mx-auto text-center flex-1 relative">
          <div className="absolute -top-12">
            <Avatar isAnimate={true} style="w-[300px] h-[300px]" />
          </div>
          <h3 className="font-lora font-[500]  text-[120px] text-white leading-none mt-6">
            xtutor
          </h3>
          <h6 className="text-[42px] font-normal mb-2 font-abel leading-none">
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
              <DropDownList
                value={education}
                setValue={setEducation}
                options={eduLevel}
              />
            </div>
            <div className="flex w-full flex-col space-y-1">
              <label className="text-[20px]">Subject/s</label>
              <MultiSelect
                value={subject}
                setValue={setSubject}
                options={subjects}
              />
            </div>
          </div>
          <button className="bg-gradient-to-r from-[#58fec4] to-blue-500 rounded-lg py-2 mt-2 text-black">{`>>>>>`}</button>
        </div>
      </div>
      <div className="mt-auto  ">
        <p className="font-abel text-[50px] font-normal flex-1 text-center mb-10">
          REVOLUTIONIZING EDUCATION.
        </p>
        <p className="text-white font-abel text-center text-[24px] mx-auto">©️ xtutor.ai, 2023</p>
      </div>
    </div>
  );
}

export default WaitingList;
