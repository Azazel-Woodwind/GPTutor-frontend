import { MutableRefObject, useEffect } from "react";

import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

import img from "../assets/WhiteLogo.png";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import { redirect } from "react-router-dom";

const FreeZone = () => {
    const logout = () => {
        localStorage.clear();
        redirect("/login");
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            redirect("/login");
        }
    }, []);
    return (
        <>
            <div className="backGround-image">
                <div>
                    <div className="flex justify-between items-center w-100 pt-5">
                        <div className="flex items-center text-white mr-5">
                            <div className="menu-item">Home</div>
                            <div className="menu-item">Setting</div>
                            <div
                                className="menu-item cursor-pointer"
                                onClick={logout}>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
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
                    <h1>Welcome Back, Sophia!</h1>
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
