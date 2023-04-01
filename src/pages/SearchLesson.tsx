import React from "react";
import { FiSearch } from "react-icons/fi";
import LessonRound from "../components/Header/LessonRound";
import LessonCard from "../components/LessonCard";
import Navbar from "../components/Navbar";
import "./searchLeson.css";

export default function SearchLesson() {
  const lessons = [
    { title: "Algebra 1", info: "Introduction", color: "#22c55e" },
    { title: "Algebra 2", info: "Algebric Proofs", color: "#22c55e" },
    { title: "Algebra 3", info: "Linear Equations", color: "#fde047" },
    { title: "Algebra 4", info: "Expansion", color: "#ef4444" },
    { title: "Algebra 5", info: "Substitution", color: "#22c55e" },
    { title: "Algebra 6", info: "Substitution", color: "#fff" },
    { title: "Algebra 7", info: "Substitution", color: "#fff" },
    { title: "Algebra 8", info: "Substitution", color: "#fff" },
    { title: "Algebra 9", info: "Substitution", color: "#fff" },
    { title: "Algebra 5", info: "Substitution", color: "#22c55e" },
    { title: "Algebra 6", info: "Substitution", color: "#fff" },
    { title: "Algebra 7", info: "Substitution", color: "#fff" },
    { title: "Algebra 8", info: "Substitution", color: "#fff" },
    { title: "Algebra 9", info: "Substitution", color: "#fff" },
  ];
  return (
    <div className="h-[calc(100vh-100px)] md:px-12 p-4 overflow-hidden">
      <div className="max-w-[1000px] mx-auto py-10">
        <div className="flex md:flex-row flex-col items-center w-full md:space-y-0 space-y-6 md:space-x-10">
          <div className="flex items-center border border-[#50576E] rounded-xl px-3 py-3.5 w-full flex-1">
            <FiSearch color="#fff" size={22} />
            <input
              type="text"
              className="border-none outline-none bg-transparent ml-2.5 font-abel text-white font-[20px]"
            />
          </div>
          <div className="flex-1 w-full flex items-center space-x-6 ">
            <button className="bg-gradient-to-r from-[#58E3FE] h-[50px] to-[#227CFF] w-full rounded-lg py-2.5 text-center">
              h
            </button>
            <div className="bg-gradient-to-r from-cyan-300 h-[50px] to-blue-600 w-full rounded-lg  text-center p-[2.5px] overflow-hidden ">
              <button className="bg-[#040A1E] w-full h-full rounded-md py-2">
                <p className="bg-gradient-to-r from-cyan-300 to-blue-600 inline-block text-transparent bg-clip-text">
                  Tutorial
                </p>
              </button>
            </div>
          </div>
        </div>
        <div
          id="scroll"
          className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-10  h-[420px] overflow-y-scroll pr-3"
        >
          {lessons.map(item => (
            <LessonCard
              title={item.title}
              info={item.info}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
