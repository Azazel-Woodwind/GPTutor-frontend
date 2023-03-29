import React, { useState } from "react";
import Logo from "../assets/Logo";
import CustomInput from "../components/CustomInput";
import DropDownList from "../components/DropDownList";
import Header from "../components/Header/header";
import ImageTextArea from "../components/ImageTextArea";
import {
  subjects,
  topics,
  eduLevel,
  booleanOptions,
  quizTypes,
} from "../Data";

export default function CreateLesson() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [education, setEducation] = useState("");
  const [subject, setSubject] = useState("");
  const [quizType, setQuizType] = useState("");
  const [publish, setPublish] = useState("");

  return (
    <div className="min-h-[100vh] text-white font-abel overflow-y-scroll pb-4">
      <div className="px-20 ">
        <Header />
      </div>

      <h1 className=" text-[50px] max-w-[1100px] mx-auto font-abel my-2">
        Create Lesson
      </h1>
      <div className="flex max-w-[1100px] mx-auto space-x-16">
        <div className="flex-1">
          <div className="flex flex-col mb-4">
            <label className="text-[16px] mb-[2px]">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border-[#50576E] border rounded-lg bg-transparent px-3 py-2 text-[16px] outline-none"
            />
          </div>
          <div className="flex mb-4 space-x-2">
            <div className="flex flex-1 flex-col ">
              <label className="text-[16px] mb-[2px]">Education Level</label>
              <DropDownList
                value={education}
                setValue={setEducation}
                options={eduLevel}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-[16px] mb-[2px]">Subject</label>
              <DropDownList
                value={subject}
                setValue={setSubject}
                options={subjects}
              />
            </div>
            <div className="flex flex-1 flex-col ">
              <label className="text-[16px] mb-[2px]">Topic</label>
              <DropDownList
                value={topic}
                setValue={setTopic}
                options={topics}
              />
            </div>
          </div>
          <CustomInput
            title="L01"
            value={title}
            setValue={setTitle}
            lines={2}
          />
          <CustomInput
            title="L02"
            value={title}
            setValue={setTitle}
            lines={2}
          />
          <CustomInput
            title="L03"
            value={title}
            setValue={setTitle}
            lines={2}
          />
          <div className="flex mb-4 space-x-2">
            <div className="flex flex-1 flex-col ">
              <label className="text-[16px] mb-[2px]">
                End of Lesson quiz type
              </label>
              <DropDownList
                value={quizType}
                setValue={setQuizType}
                options={quizTypes}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-[16px] mb-[2px]">Publish Lesson?</label>
              <DropDownList
                value={publish}
                setValue={setPublish}
                options={booleanOptions}
              />
            </div>
          </div>
          <button className="bg-gradient-to-r from-cyan-300 to-blue-600 w-full text-[#040A1E] text-[20px] rounded-lg py-2 text-center">
            Generate Lesson
          </button>
        </div>
        <div className="flex-1">
          <CustomInput
            value={description}
            setValue={setDescription}
            title="Lesson Description/Guide (Please give precise instructions and refer to LOs)"
            lines={4}
          />
          <ImageTextArea
            value={description}
            setValue={setDescription}
            title="L01 Media + Description "
            lines={2}
          />
          <ImageTextArea
            value={description}
            setValue={setDescription}
            title="L01 Media + Description "
            lines={2}
          />
          <ImageTextArea
            value={description}
            setValue={setDescription}
            title="L01 Media + Description "
            lines={2}
          />
        </div>
      </div>
    </div>
  );
}

// import { Box } from "@mui/material";
// import "bootstrap/dist/css/bootstrap.min.css";

// import React, { useState } from "react";

// import img from "../assets/WhiteLogo.png";
// import { Toaster } from "react-hot-toast";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
// import { Link } from "react-router-dom";

// const CreateLesson = () => {
//     const handleChange = () => {};
//     const [loading, setLoading] = useState(false);
//     const newData = {};

//     return (
//         <>
//             <Toaster position="top-right" reverseOrder={false} />
//             <div className="backGround-image">
//                 <Link to="/" className="login-logo flex justify-center">
//                     <img
//                         src={img}
//                         width={150}
//                         height={150}
//                         className="object-cover ms-5 pt-5"
//                     />
//                 </Link>
//                 <div className="row mt-4 m-0">
//                     <div className="col-md-2"></div>
//                     <div className="col-md-4 text-white text-7xl">
//                         Create Lesson
//                     </div>
//                 </div>
//                 <div className="row w-100 mt-2">
//                     <div className="col-md-2"></div>
//                     <div className="col-md-4">
//                         <div className="row text-white mt-4">
//                             <div className="col-md-12 form-group mt-3">
//                                 <label className="form-label">Title</label>
//                                 <input
//                                     type="text"
//                                     placeholder=""
//                                     id="email1"
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     required
//                                     name="title"
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div className="col-md-4 form-group mt-3">
//                                 <label className="form-label">
//                                     Educational level
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder=""
//                                     id="email1"
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     required
//                                     name="educational_level"
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div className="col-md-4 form-group mt-3">
//                                 <label className="form-label">Subject</label>
//                                 <input
//                                     type="text"
//                                     placeholder=""
//                                     id="email1"
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     required
//                                     name="subject"
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div className="col-md-4 form-group mt-3">
//                                 <label className="form-label">Topic</label>
//                                 <input
//                                     type="text"
//                                     placeholder=""
//                                     id="email1"
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     required
//                                     name="topic"
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div className="col-md-12 form-group mt-3">
//                                 <label className="form-label">LO1</label>
//                                 <textarea
//                                     placeholder=""
//                                     id="email1"
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     required
//                                     minLength={2}
//                                     name="lo1"
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div className="col-md-12 form-group mt-3">
//                                 <label className="form-label">LO2</label>
//                                 <textarea
//                                     placeholder=""
//                                     id="email1"
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     required
//                                     minLength={2}
//                                     name="lo2"
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div className="col-md-12 form-group mt-3">
//                                 <label className="form-label">LO3</label>
//                                 <textarea
//                                     placeholder=""
//                                     id="email1"
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     required
//                                     minLength={2}
//                                     name="lo3"
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div className="col-md-6 form-group mt-3">
//                                 <label className="form-label">
//                                     End of Lesson quiz type
//                                 </label>
//                                 <input
//                                     placeholder=""
//                                     id="email1"
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     required
//                                     name="quiz_type"
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div className="col-md-6 form-group mt-3">
//                                 <label className="form-label">
//                                     Publish Lesson?
//                                 </label>
//                                 {/* <input
//                   placeholder=""
//                   id="email1"
//                   className="form-control bg-transparent rounded-3 py-2"
//                   style={{ outline: 'none' }}
//                   required
//                   name="publish"
//                   value={newData?.publish}
//                   onChange={(e) => {
//                     handleChange(e)
//                   }}
//                   autoComplete="off"
//                 /> */}
//                                 <select
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     name="publish">
//                                     <option className="text-black" value="true">
//                                         True
//                                     </option>
//                                     <option
//                                         className="text-black"
//                                         value="false">
//                                         False
//                                     </option>
//                                 </select>
//                             </div>
//                             <div className="col-md-12 mt-5">
//                                 {!loading ? (
//                                     <button className=" py-2 rounded-3 btn-grad text-capitalize w-100">
//                                         Generate Lesson
//                                     </button>
//                                 ) : (
//                                     <button
//                                         className="py-2 rounded-3 btn-grad text-capitalize w-100"
//                                         // onClick={handleSubmit}
//                                     >
//                                         <AutorenewIcon className="icon-spin" />
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-4">
//                         <div className="row text-white mt-4">
//                             <div className="col-md-12 form-group mt-3">
//                                 <label className="form-label">
//                                     Lesson Description/Guide (Please give
//                                     precise instructions and refer to LOs)
//                                 </label>
//                                 <textarea
//                                     placeholder=""
//                                     id="email1"
//                                     className="form-control bg-transparent rounded-3 py-2"
//                                     style={{ outline: "none" }}
//                                     required
//                                     name="description"
//                                     rows={5}
//                                     autoComplete="off"
//                                 />
//                             </div>
//                             <div className="col-md-12 form-group mt-2">
//                                 <div className="relative">
//                                     <label className="form-label">
//                                         L01 Media + Description
//                                     </label>
//                                     <textarea
//                                         placeholder=""
//                                         id="email1"
//                                         className="form-control bg-transparent rounded-3 py-2 "
//                                         style={{
//                                             outline: "none",
//                                             paddingLeft: "65px",
//                                         }}
//                                         required
//                                         name="lo1_description"
//                                         rows={2}
//                                         autoComplete="off"
//                                     />
//                                     <label
//                                         htmlFor="fileUpload1"
//                                         className="absolute top-[41px] left-[10px]">
//                                         <div>
//                                             <AddPhotoAlternateOutlinedIcon
//                                                 style={{ fontSize: "45px" }}
//                                             />
//                                         </div>
//                                     </label>
//                                     <input
//                                         hidden
//                                         id="fileUpload1"
//                                         type="file"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-md-12 form-group mt-3">
//                                 <div className="relative">
//                                     <label className="form-label">
//                                         L02 Media + Description
//                                     </label>
//                                     <textarea
//                                         placeholder=""
//                                         id="email1"
//                                         className="form-control bg-transparent rounded-3 py-2 "
//                                         style={{
//                                             outline: "none",
//                                             paddingLeft: "65px",
//                                         }}
//                                         required
//                                         name="lo2_description"
//                                         rows={2}
//                                         autoComplete="off"
//                                     />
//                                     <label
//                                         htmlFor="fileUpload2"
//                                         className="absolute top-[41px] left-[10px]">
//                                         <div>
//                                             <AddPhotoAlternateOutlinedIcon
//                                                 style={{ fontSize: "45px" }}
//                                             />
//                                         </div>
//                                     </label>
//                                     <input
//                                         hidden
//                                         id="fileUpload2"
//                                         type="file"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-md-12 form-group mt-3">
//                                 <div className="relative">
//                                     <label className="form-label">
//                                         L03 Media + Description
//                                     </label>
//                                     <textarea
//                                         placeholder=""
//                                         id="email1"
//                                         className="form-control bg-transparent rounded-3 py-2 "
//                                         style={{
//                                             outline: "none",
//                                             paddingLeft: "65px",
//                                         }}
//                                         required
//                                         name="lo3_description"
//                                         rows={2}
//                                         autoComplete="off"
//                                     />
//                                     <label
//                                         htmlFor="fileUpload3"
//                                         className="absolute top-[41px] left-[10px]">
//                                         <div>
//                                             <AddPhotoAlternateOutlinedIcon
//                                                 style={{ fontSize: "45px" }}
//                                             />
//                                         </div>
//                                     </label>
//                                     <input
//                                         hidden
//                                         id="fileUpload3"
//                                         type="file"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-2"></div>
//                 </div>
//             </div>
//         </>
//     );
// };

// const Content3 = () => {
//     return (
//         <Box sx={{ height: "100vh", width: "100%" }}>
//             <CreateLesson />
//         </Box>
//     );
// };

// export default Content3;
