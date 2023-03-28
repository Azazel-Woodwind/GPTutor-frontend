import { MutableRefObject } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect } from "react";

import WhiteLogo from "../../assets/WhiteLogo.png";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Chat = () => {
    // data is lesson data
    return (
        <div style={{ height: "100vh" }}>
            <div className="backGround-image">
                <div>
                    <div className="d-flex justify-content-between align-items-center w-100 pt-5">
                        <Link to="/" className="login-logo">
                            <img
                                src={WhiteLogo}
                                width={150}
                                height={150}
                                className="object-cover ms-5"
                            />
                        </Link>
                        <div className="d-flex align-items-center text-white me-5">
                            <div className="menu-item">Home</div>
                            <div className="menu-item">Setting</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-5">
                        <div
                            className="position-relative"
                            style={{ width: "30%" }}>
                            <input
                                type="text"
                                placeholder="GCSE Maths"
                                id="email1"
                                className="form-control bg-transparent rounded-3 py-2 ps-5"
                                style={{ outline: "none" }}
                                required
                                name="email"
                                autoComplete="off"
                            />
                            <div className="text-white search-icon">
                                <SearchIcon />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row me-0 mt-5">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 row gy-4">
                        {data?.map((val: any) => {
                            return (
                                <div className="col-md-4">
                                    <div className="chat-box rounded-3 p-3 d-flex">
                                        <div className="w-100">
                                            <div className="text-name">
                                                {val?.subject}
                                            </div>
                                            <div className="text-intro">
                                                {val?.topic}
                                            </div>
                                        </div>
                                        <div
                                            id="outerContainer1"
                                            className="w-100">
                                            <div id="container1">
                                                <div className="item1"></div>
                                                <div
                                                    className="circle1"
                                                    style={{
                                                        animationDelay: "0s",
                                                    }}></div>
                                                <div
                                                    className="circle1"
                                                    style={{
                                                        animationDelay: "1s",
                                                    }}></div>
                                                <div
                                                    className="circle1"
                                                    style={{
                                                        animationDelay: "2s",
                                                    }}></div>
                                                <div
                                                    className="circle1"
                                                    style={{
                                                        animationDelay: "3s",
                                                    }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="mt-5 py-2 rounded-3 btn-grad text-capitalize me-4 chat-btn">
                        Chat Mode
                    </button>
                    <button className="mt-5 py-2 rounded-3 btn-simple text-capitalize ms-4 chat-btn">
                        Tutorial
                    </button>
                </div>
                <div className="mt-5">
                    <div className="d-flex w-100 justify-content-center align-items-center">
                        <div className="icon-home mx-3">
                            <HomeIcon
                                sx={{
                                    fontSize: "10px",
                                }}
                            />
                        </div>
                        <div className="icon-blue mx-3">
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
        </div>
    );
};

export default Chat;
