import { Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";

import img from "../assets/WhiteLogo.png";
import { Toaster } from "react-hot-toast";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Link } from "react-router-dom";

const CreateLesson = () => {
    const handleChange = () => {};
    const [loading, setLoading] = useState(false);
    const newData = {};

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="backGround-image">
                <Link to="/" className="login-logo flex justify-center">
                    <img
                        src={img}
                        width={150}
                        height={150}
                        className="object-cover ms-5 pt-5"
                    />
                </Link>
                <div className="row mt-4 m-0">
                    <div className="col-md-2"></div>
                    <div className="col-md-4 text-white text-7xl">
                        Create Lesson
                    </div>
                </div>
                <div className="row w-100 mt-2">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        <div className="row text-white mt-4">
                            <div className="col-md-12 form-group mt-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    id="email1"
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    required
                                    name="title"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <label className="form-label">
                                    Educational level
                                </label>
                                <input
                                    type="text"
                                    placeholder=""
                                    id="email1"
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    required
                                    name="educational_level"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <label className="form-label">Subject</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    id="email1"
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    required
                                    name="subject"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <label className="form-label">Topic</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    id="email1"
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    required
                                    name="topic"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-md-12 form-group mt-3">
                                <label className="form-label">LO1</label>
                                <textarea
                                    placeholder=""
                                    id="email1"
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    required
                                    minLength={2}
                                    name="lo1"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-md-12 form-group mt-3">
                                <label className="form-label">LO2</label>
                                <textarea
                                    placeholder=""
                                    id="email1"
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    required
                                    minLength={2}
                                    name="lo2"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-md-12 form-group mt-3">
                                <label className="form-label">LO3</label>
                                <textarea
                                    placeholder=""
                                    id="email1"
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    required
                                    minLength={2}
                                    name="lo3"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-md-6 form-group mt-3">
                                <label className="form-label">
                                    End of Lesson quiz type
                                </label>
                                <input
                                    placeholder=""
                                    id="email1"
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    required
                                    name="quiz_type"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-md-6 form-group mt-3">
                                <label className="form-label">
                                    Publish Lesson?
                                </label>
                                {/* <input
                  placeholder=""
                  id="email1"
                  className="form-control bg-transparent rounded-3 py-2"
                  style={{ outline: 'none' }}
                  required
                  name="publish"
                  value={newData?.publish}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  autoComplete="off"
                /> */}
                                <select
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    name="publish">
                                    <option className="text-black" value="true">
                                        True
                                    </option>
                                    <option
                                        className="text-black"
                                        value="false">
                                        False
                                    </option>
                                </select>
                            </div>
                            <div className="col-md-12 mt-5">
                                {!loading ? (
                                    <button className=" py-2 rounded-3 btn-grad text-capitalize w-100">
                                        Generate Lesson
                                    </button>
                                ) : (
                                    <button
                                        className="py-2 rounded-3 btn-grad text-capitalize w-100"
                                        // onClick={handleSubmit}
                                    >
                                        <AutorenewIcon className="icon-spin" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row text-white mt-4">
                            <div className="col-md-12 form-group mt-3">
                                <label className="form-label">
                                    Lesson Description/Guide (Please give
                                    precise instructions and refer to LOs)
                                </label>
                                <textarea
                                    placeholder=""
                                    id="email1"
                                    className="form-control bg-transparent rounded-3 py-2"
                                    style={{ outline: "none" }}
                                    required
                                    name="description"
                                    rows={5}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-md-12 form-group mt-2">
                                <div className="relative">
                                    <label className="form-label">
                                        L01 Media + Description
                                    </label>
                                    <textarea
                                        placeholder=""
                                        id="email1"
                                        className="form-control bg-transparent rounded-3 py-2 "
                                        style={{
                                            outline: "none",
                                            paddingLeft: "65px",
                                        }}
                                        required
                                        name="lo1_description"
                                        rows={2}
                                        autoComplete="off"
                                    />
                                    <label
                                        htmlFor="fileUpload1"
                                        className="absolute top-[41px] left-[10px]">
                                        <div>
                                            <AddPhotoAlternateOutlinedIcon
                                                style={{ fontSize: "45px" }}
                                            />
                                        </div>
                                    </label>
                                    <input
                                        hidden
                                        id="fileUpload1"
                                        type="file"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 form-group mt-3">
                                <div className="relative">
                                    <label className="form-label">
                                        L02 Media + Description
                                    </label>
                                    <textarea
                                        placeholder=""
                                        id="email1"
                                        className="form-control bg-transparent rounded-3 py-2 "
                                        style={{
                                            outline: "none",
                                            paddingLeft: "65px",
                                        }}
                                        required
                                        name="lo2_description"
                                        rows={2}
                                        autoComplete="off"
                                    />
                                    <label
                                        htmlFor="fileUpload2"
                                        className="absolute top-[41px] left-[10px]">
                                        <div>
                                            <AddPhotoAlternateOutlinedIcon
                                                style={{ fontSize: "45px" }}
                                            />
                                        </div>
                                    </label>
                                    <input
                                        hidden
                                        id="fileUpload2"
                                        type="file"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 form-group mt-3">
                                <div className="relative">
                                    <label className="form-label">
                                        L03 Media + Description
                                    </label>
                                    <textarea
                                        placeholder=""
                                        id="email1"
                                        className="form-control bg-transparent rounded-3 py-2 "
                                        style={{
                                            outline: "none",
                                            paddingLeft: "65px",
                                        }}
                                        required
                                        name="lo3_description"
                                        rows={2}
                                        autoComplete="off"
                                    />
                                    <label
                                        htmlFor="fileUpload3"
                                        className="absolute top-[41px] left-[10px]">
                                        <div>
                                            <AddPhotoAlternateOutlinedIcon
                                                style={{ fontSize: "45px" }}
                                            />
                                        </div>
                                    </label>
                                    <input
                                        hidden
                                        id="fileUpload3"
                                        type="file"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </>
    );
};

const Content3 = () => {
    return (
        <Box sx={{ height: "100vh", width: "100%" }}>
            <CreateLesson />
        </Box>
    );
};

export default Content3;
