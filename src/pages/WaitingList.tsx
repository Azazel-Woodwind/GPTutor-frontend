import React, { useState } from "react";
import Avatar from "../components/Avatar";
import DropDownList from "../components/DropDownList";
import MultiSelect from "../components/MultiSelect";
import RadioButton from "../components/RadioButton";
import { eduLevel, subjects, occupations } from "../Data";

function WaitingList() {
  const [education, setEducation] = useState("");
  const [subject, setSubject] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");

  console.log("occupation", occupation);

  return (
    <div className="md:max-w-[1100px]  mx-auto flex flex-col min-h-[calc(100vh-100px)] text-white px-6 md:pt-4 pt-2 pb-4">
      <div className="flex flex-col md:flex-row items-center justify-between md:space-x-12 pt-0  ">
        <div className=" mx-auto text-center flex-1 relative">
          <div className="absolute -top-12 hidden md:block ">
            <Avatar isAnimate={true} style="w-[375px] h-[375px]" />
          </div>
          <h3 className="font-lora font-[500]  md:text-[90px] text-[50px] text-white md:leading-none  mt-[84px] md:-ml-[14px] md:text-let text-center">
            <span className="italic md:mr-[10px] mr-2">x</span>tutor
          </h3>
          <h6 className="text-[28px]  text-center -ml-20 -mt-1 font-normal mb-2 font-abel leading-none md:block hidden">
            Hello Sophia.
          </h6>
        </div>
        <div className="flex flex-col flex-1 font-abel md:max-w-[400px] w-full ">
          <h3 className="md:text-[32px] text-[32px] text-center md:mb-1 mb-8">
            Join Waiting List.
          </h3>
          <div className="flex flex-col space-y-1 mb-2">
            <label className="text-[20px]">Name</label>
            <input
              type="text"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-1"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1 mb-2">
            <label className="text-[20px]">Email</label>
            <input
              type="email"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-1"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col space-y-1 mb-2">
            <label className="text-[20px]">Occupation</label>
            {/* <DropDownList
              value={occupation}
              setValue={setOccupation}
              options={occupations}
            /> */}
            <div className="flex items-center space-x-6">
              <RadioButton
                name="occupation"
                id="Student"
                value={occupation}
                setValue={setOccupation}
              />
              <RadioButton
                name="occupation"
                id="Teacher"
                value={occupation}
                setValue={setOccupation}
              />
            </div>
          </div>
          <div className="flex space-x-3 items-center mb-2">
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
          <button className="bg-gradient-to-r from-[#58E3FE] to-[#227CFF] rounded-lg py-2 mt-2 text-white">{`>>>>>>>>>>>>>>`}</button>
        </div>
      </div>
      <div className="mt-auto ">
        <p className="font-abel mt-10 md:text-[40px] text-[28px] font-normal flex-1 text-center mb-6">
          REVOLUTIONIZING EDUCATION.
        </p>
        <p className="text-white font-abel text-center text-[22px] mx-auto">
          ©️ xtutor.ai, 2023
        </p>
      </div>
    </div>
  );
}

export default WaitingList;
