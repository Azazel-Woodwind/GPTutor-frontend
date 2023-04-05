import React, { useState } from "react";
import Header from "../components/Header/header";
import DropDownList from "../components/DropDownList";
import { educationLevels, subjects } from "../Data";
import MultiSelect from "../components/MultiSelect";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/WaitingList/ErrorMessage";
import SuccessMessage from "../components/WaitingList/SuccessMessage";
import UserAPI from "../api/UserAPI";

const SUCCESS_MESSAGE_BOLD = "Thank you for registering!";
const SUCCESS_MESSAGE_SMALL =
    "Please check your inbox to confirm your email address";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const register = async () => {
        if (
            !firstName ||
            !email ||
            !password ||
            !educationLevel ||
            !selectedSubjects.length
        ) {
            setErrorMessage("Please fill all the fields");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }

        try {
            const response = await UserAPI.signUp({
                first_name: firstName,
                email,
                password,
                education_level: educationLevel.toLowerCase() as EducationLevel,
                subjects: selectedSubjects,
            });

            console.log(response);
            setEducationLevel("");
            setSelectedSubjects([]);
            setFirstName("");
            setPassword("");
            setEmail("");
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 10000);
        } catch (error) {
            console.log(error);
            setErrorMessage("Something went wrong");
        }
    };

    return (
        <div className="flex flex-col text-white min-h-[100vh] pb-4 md:px-12 px-4 ">
            <div className="flex md:flex-row flex-col items-center md:justify-between justify-center flex-1">
                <div className="">
                    <Avatar style="w-[375px] h-[375px] ml-32 hidden md:block" />
                </div>
                <div className="font-abel  md:max-w-[420px] w-full md:mr-[100px]">
                    <p className="text-[42px] text-center font-light font-abel mb-1  leading-none">
                        Create Account
                    </p>
                    <p className="bg-gradient-to-r mb-4 leading-none text-center from-white/20 to-white/90  text-transparent bg-clip-text">
                        {`>>>>>>>>>>>>>>`}
                    </p>
                    {errorMessage && (
                        <ErrorMessage
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    )}

                    {success && (
                        <SuccessMessage
                            successMessageBold={SUCCESS_MESSAGE_BOLD}
                            successMessageSmall={SUCCESS_MESSAGE_SMALL}
                            setSuccess={setSuccess}
                        />
                    )}
                    <div className="flex flex-col space-y-1 mb-3">
                        <label className="text-[20px]">First name</label>
                        <input
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
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
                            <label className="text-[20px]">
                                Education Level
                            </label>
                            <DropDownList
                                value={educationLevel}
                                setValue={setEducationLevel}
                                options={educationLevels}
                            />
                        </div>
                        <div className="flex flex-1 flex-col space-y-1 ">
                            <label className="text-[20px]">Main Subjects</label>
                            <MultiSelect
                                value={selectedSubjects}
                                setValue={setSelectedSubjects}
                                options={subjects}
                            />
                        </div>
                    </div>
                    <button
                        onClick={register}
                        className="bg-gradient-to-r font-abel  w-full from-[#58E3FE] to-[#227CFF] rounded-lg py-2.5 mt-3 text-black">
                        Sign Up
                    </button>
                    <p className="text-sm text-gray-400 font-abel text-center mt-6">
                        Already have an account?{" "}
                        <span className="text-white underline">
                            <Link to="/login">Log in</Link>
                        </span>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
