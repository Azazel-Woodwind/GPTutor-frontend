import { MutableRefObject, useEffect } from "react";

import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

import img from "../assets/WhiteLogo.png";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import { redirect } from "react-router-dom";
import { useAuth } from "../context/SessionContext";

const FreeZone = () => {
    const { session } = useAuth();
    console.log(session);

    return (
        <>
            <div className="backGround-image">
                <div>
                    <div id="outerContainer">
                        <div id="container">
                            <div className="item"></div>
                            <div
                                className="circle"
                                style={{ animationDelay: "0s" }}></div>
                            <div
                                className="circle"
                                style={{ animationDelay: "1s" }}></div>
                            <div
                                className="circle"
                                style={{ animationDelay: "2s" }}></div>
                            <div
                                className="circle"
                                style={{ animationDelay: "3s" }}></div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-white home-text">
                    <h1>
                        Welcome Back, {session!.user.user_metadata.first_name}!
                    </h1>
                </div>
                <div className="mt-5">
                    <div className="flex w-100 justify-center items-center">
                        <div className="icon-home mx-3">
                            <HomeIcon
                                sx={{
                                    fontSize: "10px",
                                }}
                            />
                        </div>
                        <div className="icon-home mx-3">
                            <DesktopMacIcon
                                sx={{
                                    fontSize: "10px",
                                }}
                            />
                        </div>
                        <div className="icon-home mx-3">
                            <SettingsIcon
                                sx={{
                                    fontSize: "10px",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Content = () => {
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         redirect("/login");
    //         return;
    //     }
    // }, []);
    return (
        <div style={{ height: "100vh" }}>
            <Toaster position="top-right" reverseOrder={false} />
            <FreeZone />
        </div>
    );
};

export default Content;
