import React, { useState } from "react";
import Header from "../components/Header/header";
import DropDownList from "../components/DropDownList";
import { eduLevel, subjects } from "../Data";
import MultiSelect from "../components/MultiSelect";
import Avatar from "../components/Avatar";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [education, setEducation] = useState("");
  const [subject, setSubject] = useState([]);

  return (
    <div className="flex flex-col text-white min-h-[100vh] pb-4 px-12 ">
      <Header />

      <div className="flex items-center justify-between flex-1">
        <div>
          <Avatar style="w-[320px] h-[320px] ml-32" />
        </div>
        <div className=" w-[420px] mr-12">
          <p className="text-[42px] text-center font-light font-abel mb-1  leading-none">
            Create Account.
          </p>
          <p className="bg-gradient-to-r mb-4 leading-none text-center from-white/20 to-white/90  text-transparent bg-clip-text">
            {`>>>>>>>>>>>>>>`}
          </p>
          <div className="flex flex-col space-y-1 mb-3">
            <label className="text-[20px]">Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-2"
            />
          </div>
          <div className="flex flex-col space-y-1 mb-3">
            <label className="text-[20px]">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-2"
            />
          </div>
          <div className="flex flex-col space-y-1 mb-3">
            <label className="text-[20px]">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-2"
            />
          </div>
          <div className="flex space-x-3 items-center mb-3">
            <div className="flex flex-1 flex-col space-y-1">
              <label className="text-[20px]">Education Level</label>
              <DropDownList
                value={education}
                setValue={setEducation}
                options={eduLevel}
              />
            </div>
            <div className="flex flex-1 flex-col space-y-1 ">
              <label className="text-[20px]">Main Subjects</label>
              <MultiSelect
                value={subject}
                setValue={setSubject}
                options={subjects}
              />
            </div>
          </div>
          <button className="bg-gradient-to-r from-[#58fec4] w-full to-blue-500 rounded-lg py-2.5 mt-3 text-black">
            Sign Up
          </button>
          <p className="text-sm text-gray-400 font-abel text-center mt-6">
            Already have an account?{" "}
            <span className="text-white underline">Log in</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
