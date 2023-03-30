import React, { useState } from "react";
import Avatar from "../components/Avatar";
import DropDownList from "../components/DropDownList";
import MultiSelect from "../components/MultiSelect";
import { eduLevel, subjects, occupations } from "../Data";

function WaitingList() {
  const [education, setEducation] = useState("");
  const [subject, setSubject] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");

  return (
    <div className="md:max-w-[1100px]  mx-auto flex flex-col  h-screen text-white px-6 md:pt-12 pt-2 pb-4">
      <div className="flex flex-col md:flex-row items-center justify-between md:space-x-12  ">
        <div className=" mx-auto text-center flex-1 relative">
          <div className="absolute -top-12 hidden md:block">
            <Avatar isAnimate={true} style="w-[280px] h-[280px]" />
          </div>
          <h3 className="font-lora font-[500]  md:text-[120px] text-[50px] text-white md:leading-none  mt-6 md:-ml-8 md:text-let text-center">
            <span className="italic md:mr-4 mr-2">x</span>tutor
          </h3>
          <h6 className="text-[42px] font-normal mb-2 font-abel leading-none md:block hidden">
            Hello Sophia.
          </h6>
        </div>
        <div className="flex flex-col flex-1 font-abel md:max-w-[400px] w-full ">
          <h3 className="md:text-[40px] text-[32px] text-center md:mb-3 mb-8">Join Waiting List.</h3>
          <div className="flex flex-col space-y-1 mb-3">
            <label className="text-[20px]">First Name</label>
            <input
              type="text"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-1"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1 mb-3">
            <label className="text-[20px]">Last Name</label>
            <input
              type="text"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-1"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1 mb-3">
            <label className="text-[20px]">Email</label>
            <input
              type="email"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-1"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col space-y-1 mb-3">
            <label className="text-[20px]">Occupation</label>
            <DropDownList
              value={occupation}
              setValue={setOccupation}
              options={occupations}
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
          <button className="bg-gradient-to-r from-[#58fec4] to-blue-500 rounded-lg py-2 mt-2 text-white">{`>>>>>>>>>>>>>>`}</button>
        </div>
      </div>
      <div className="mt-auto  ">
        <p className="font-abel md:text-[50px] text-[28px] font-normal flex-1 text-center mb-10">
          REVOLUTIONIZING EDUCATION.
        </p>
        <p className="text-white font-abel text-center text-[20px] mx-auto">
          ©️ xtutor.ai, 2023
        </p>
      </div>
    </div>
  );
}

export default WaitingList;
