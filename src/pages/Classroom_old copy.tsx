import React, { useState, useRef, useEffect } from "react";

import Rectangle from "../assets/Rectangle";
import RoundedLine from "../assets/RoundedLine";
import Chevron from "../assets/icons/Chevron";
import image from "../assets/neurons.png";

export interface ChatEntry {
    source: string;
    text: string;
}

export default function Classroom() {
    return (
        <>
            <section className="overflow-hidden relative text-white bg-[#040A1E] w-screen h-screen">
                <div className="absolute w-72 h-72 bg-[#217DB0] blur-[350px] -top-10 left-1/2 -translate-x-1/2" />
                <div className="absolute w-80 h-48 bg-gradient-to-r from-[#e9d362] to-[#DBD5A4] blur-[200px] top-1/2 right-0 -translate-y-1/2" />
                <div className="absolute w-72 h-72 bg-[#3750C0] blur-[350px] -bottom-10 -left-10" />
                <div className="container mx-auto w-full space-y-5">
                    <div
                        className={`pt-0 flex justify-center items-center delay-75 duration-500 transition-all ${
                            isOpen ? "hidden" : "block"
                        }`}>
                        <div className="w-2/5 inline-flex justify-center">
                            <div className="border-t border-l border-r rounded-full border-slate-600 md:p-8 lg :p-10 w-fit bg-gradient-to-b from-[#ffffff]/10 to-[#ffffff]/0 ">
                                <div className="border-t border-l border-r rounded-full border-slate-600 md:p-8 lg:p-10 w-fit bg-gradient-to-b from-[#ffffff]/15 to-[#ffffff]/0">
                                    <div className="border-t border-l border-r rounded-full border-slate-600 md:p-6 lg:p-8 w-fit bg-gradient-to-b from-[#ffffff]/20 to-[#ffffff]/0">
                                        <div className="border rounded-full border-slate-600 h-24 w-24 bg-slate-600 backdrop-filter bg-opacity-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/5 -mt-3 xl:mt-0 grid place-content-center">
                            <div className="relative md:w-[500px] lg:w-[600px] md:h-72 lg:h-80 pt-10 px-5">
                                <RoundedLine className="absolute top-0 left-0" />
                                <div className="absolute left-1/2 -translate-x-1/2  -top-10 w-[73%] h-20">
                                    <Rectangle className="w-full h-full" />
                                    <h4 className="text-center w-full text-truncate absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                                        GCSE | Cellular Biology - Nerve System
                                    </h4>
                                </div>
                                <div className="relative overflow-hidden rounded-xl w-full h-full">
                                    <img
                                        src={image}
                                        className="object-cover"
                                        alt="neurons"
                                    />
                                </div>
                                <button className="group hover:scale-105 rounded-full p-2 bg-[#040A1E] absolute  top-1/2 -translate-y-1/2 -left-3">
                                    <Chevron className="group-hover:scale-125 group-active:scale-95 w-6 h-6 rotate-90" />
                                </button>
                                <button className="group hover:scale-105 rounded-full p-2 bg-[#040A1E] absolute  top-1/2 -translate-y-1/2 -right-3">
                                    <Chevron className="group-hover:scale-125 group-active:scale-95 w-6 h-6 -rotate-90" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`z-50 px-14 w-4/5 bg-white absolute bottom-0 left-1/2 -translate-x-1/2  rounded-t-2xl drop-shadow backdrop-filter backdrop-blur-md bg-opacity-5 border-t border-l border-r border-slate-600 ${
                            isOpen ? "h-[80vh] py-6" : "h-[35vh] py-5"
                        }`}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="absolute top-0 left-1/2 -translate-x-1/2">
                            <Chevron
                                className={`w-6 h-6 hover:scale-110 duration-300 transition-transform ${
                                    isOpen ? "rotate-0" : "rotate-180"
                                }`}
                            />
                        </button>
                        <ul
                            className={`${
                                responses.length > 0 ? "block" : "hidden"
                            } overflow-y-auto divide-y divide-slate-600 px-2.5 text-base section-scrollbar ${
                                isOpen ? "h-[90%]" : "h-[70%]"
                            }`}>
                            {responses?.map(r => (
                                <li className="py-2">{r.text}</li>
                            ))}
                        </ul>

                        <div className="absolute lg:bottom-3 md:bottom-2 md:w-[90%] xl:w-[93%] flex gap-x-3">
                            <div className="relative border-2 border-blue-500 rounded-xl bg-none w-full p-1">
                                <button
                                    onClick={listen}
                                    className="absolute rounded-lg inset-y-0 left-0 flex px-2 m-1 items-center bg-gradient-to-r from-[#58E3FE] via-[#24AAFF] to-[#0163FF]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                                        />
                                    </svg>
                                </button>
                                <input
                                    type="search"
                                    inputMode="text"
                                    id="prompt"
                                    value={userInput}
                                    onChange={e => handleInput(e)}
                                    className="bg-inherit text-gray-50 text-sm rounded-lg focus:outline-none block w-full pl-12 p-2.5"
                                    placeholder="Where is the nucleus found in nerve cells?"
                                />
                            </div>
                            <button
                                onClick={() => sendPrompt()}
                                disabled={
                                    cancellable || isSpeaking || !isInputValid
                                }
                                className="disbaled:cursor-not-allowed rounded-lg px-2.5 m-0.5 items-center bg-gradient-to-r from-[#58E3FE] via-[#24AAFF] to-[#0163FF]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={cancel}
                                className="rounded-lg px-2.5 m-0.5 items-center bg-gradient-to-r from-[#58E3FE] via-[#24AAFF] to-[#0163FF]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke={
                                        cancellable ? "red" : "currentColor"
                                    }
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
