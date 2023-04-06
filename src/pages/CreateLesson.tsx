import React, { useState } from "react";
import Logo from "../assets/Logo";
import CustomInput from "../components/CustomInput";
import DropDownList from "../components/DropDownList";
import Footer from "../components/Footer";
import Header from "../components/Header/header";
import ImageTextArea from "../components/ImageTextArea";
import {
    subjects,
    educationLevels,
    MAX_LEARNING_OBJECTIVES,
    MIN_LEARNING_OBJECTIVES,
} from "../lib/FormData";
import { useForm } from "react-hook-form";
import useDynamicFields from "../hooks/useDynamicFields";
import LearningObjective from "../components/CreateLesson/LearningObjective";
import { FaPlus } from "react-icons/fa";
import LessonAPI from "../api/LessonAPI";

export default function CreateLesson() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [subject, setSubject] = useState("");
    const [publish, setPublish] = useState(false);

    const form = useForm();

    const imageUnwrappers = React.useRef<Function[]>([]);
    const learningObjectives = useDynamicFields({
        formElements: [
            <textarea
                name="title"
                rows={1}
                style={{ resize: "none" }}
                className="w-full border-[#50576E] border rounded-lg bg-transparent px-3 py-1.5 text-[16px] outline-none"
            />,
        ],
        max: MAX_LEARNING_OBJECTIVES,
        min: MIN_LEARNING_OBJECTIVES,
        form,
    });

    const onSubmit = async (data: any) => {
        console.log("FORM SUBMITTED");

        const parsedImages = imageUnwrappers.current.map(unwrap =>
            unwrap(data)
        );

        const unwrappedLearningObjectives = learningObjectives.unwrap(data);

        const parsedObjectives = unwrappedLearningObjectives.map(
            (objective, index) => ({
                ...unwrappedLearningObjectives[index],
                images: parsedImages[index],
            })
        );

        // console.log("Lesson title:", title);
        // console.log("Education Level:", educationLevel);
        // console.log("Subject:", subject);
        // console.log("Description:", description);
        // console.log("Publishing:", publish);

        // parsedObjectives.forEach((objective, index) => {
        //     console.log(
        //         `Learning Objective ${index + 1}: ${JSON.stringify(objective)}`
        //     );
        // });
        try {
            const lesson = await LessonAPI.create({
                title,
                subject: subject.toLowerCase() as Subject,
                description,
                education_level: educationLevel.toLowerCase() as EducationLevel,
                learning_objectives: parsedObjectives,
            });
            console.log(lesson);

            // if (publish) {
            //     await LessonAPI.publishById(lesson.id);
            // }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="min-h-[calc(100vh-100px)] text-white font-abel pb-4 ">
                <h1 className=" md:text-[50px] text-[32px] max-w-[1100px] mx-auto font-abel my-2 px-4">
                    Create Lesson
                </h1>
                <div className="flex md:flex-col max-w-[1100px] mx-auto md:space-x-16 px-4">
                    <div className="flex-1">
                        <div className="flex flex-row gap-5 p-5">
                            <div className="flex-1">
                                <div className="flex flex-col mb-4">
                                    <label className="text-[16px] mb-[2px]">
                                        Title
                                    </label>
                                    <input
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="border-[#50576E] border rounded-lg bg-transparent px-3 py-2 text-[16px] outline-none"
                                    />
                                </div>
                                <div className="flex mb-4 space-x-2 gap-20">
                                    <div className="flex flex-1 flex-col ">
                                        <label className="text-[16px] mb-[2px]">
                                            Education Level
                                        </label>
                                        <DropDownList
                                            value={educationLevel}
                                            setValue={setEducationLevel}
                                            options={educationLevels}
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <label className="text-[16px] mb-[2px]">
                                            Subject
                                        </label>
                                        <DropDownList
                                            value={subject}
                                            setValue={setSubject}
                                            options={subjects}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <CustomInput
                                    value={description}
                                    setValue={setDescription}
                                    title="Lesson Description/Guide (Please give precise instructions and refer to LOs)"
                                    lines={4}
                                />
                            </div>
                        </div>
                        <div className="ml-5">
                            <h1>Learning objectives</h1>
                        </div>

                        <div>
                            {learningObjectives.elements.map(
                                (elements, index) => (
                                    <LearningObjective
                                        key={index}
                                        index={index}
                                        imageUnwrappers={imageUnwrappers}
                                        elements={elements}
                                        learningObjectives={learningObjectives}
                                        form={form}
                                    />
                                )
                            )}
                        </div>
                        <div className="flex justify-center mt-5">
                            <button
                                disabled={
                                    learningObjectives.elements.length >=
                                    MAX_LEARNING_OBJECTIVES
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    learningObjectives.addField();
                                }}>
                                <FaPlus
                                    color={
                                        learningObjectives.elements.length >=
                                        MAX_LEARNING_OBJECTIVES
                                            ? "dimgray"
                                            : "#4e57d5"
                                    }
                                    size={24}
                                />
                            </button>
                        </div>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                                className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary"
                                type="checkbox"
                                id="checkboxChecked"
                                checked={publish}
                                onChange={e => setPublish(e.target.checked)}
                            />
                            <label
                                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                htmlFor="checkboxChecked">
                                Publish this lesson
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex max-w-[1100px] mx-auto md:space-x-16 px-4 my-6 justify-center">
                    <button className="flex-1 mx-10 bg-gradient-to-r from-cyan-300 to-blue-600 w-full text-[#040A1E] text-[20px] rounded-lg py-2 text-center">
                        Generate Lesson
                    </button>
                </div>
                <Footer />
            </div>
        </form>
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
