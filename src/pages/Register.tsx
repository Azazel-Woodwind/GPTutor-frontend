import React, { useState } from "react";
import Header from "../components/Header/header";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [education, setEducation] = useState("");
  const [subjects, setSubjects] = useState("");

  return (
    <div className="flex flex-col text-white min-h-[100vh] pb-4 px-12 ">
      <Header />
      <div className="ml-auto max-w-[620px] mr-12">
        <p className="text-[34px] font-light font-abel leading-none">
          Welcome to{" "}
          <span className="text-[42px] font-lora font-medium">xtutor</span>
        </p>
        <p className="text-[34px] font-light font-abel mb-3">Create Account.</p>
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
          <label className="text-[20px]">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
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
          <label className="text-[20px]">Phone Number</label>
          <input
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            type="text"
            className="bg-transparent outline-none border border-white rounded-lg px-2 py-2"
          />
        </div>
        <div className="flex space-x-3 items-center mb-3">
          <div className="flex w-full flex-col space-y-1">
            <label className="text-[20px]">Education Level</label>
            <input
              type="text"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-2"
            />
          </div>
          <div className="flex w-full flex-col space-y-1">
            <label className="text-[20px]">Main Subjects</label>
            <input
              type="email"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-2"
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
  );
}
