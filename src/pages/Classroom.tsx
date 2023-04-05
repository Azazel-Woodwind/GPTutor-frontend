import React, { useState, useRef, useEffect } from "react";
import Rectangle from "../assets/Rectangle";
import RoundedLine from "../assets/RoundedLine";
import Navbar from "../components/Navbar";
import nurons from "../assets/neurons.png";
import neucleus from "../assets/nucleus.jpg";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./searchLesson.css";
import Avatar from "../components/Avatar";

export default function Classroom() {
    const [isCollapse, setIsCollapse] = useState(false);
    const [imageCount, setImageCount] = useState(0);
    const images = [
        { img: nurons, desc: "Cellular Biology - The Nerve Cell" },
        { img: image1, desc: "Forces & Motion" },
        { img: image2, desc: "Astrophysics - Planet Earth" },
        { img: image3, desc: "Cellular Biology - Eukaryotic Cells" },
        { img: image4, desc: "DNA" },
        { img: image5, desc: "Cellular Biology - Eukaryotic Cells" },
        { img: image6, desc: "The Human Immune System" },
    ];
    const [heightScreen, setHeightScreen] = useState(0);

    useEffect(() => {
        const { innerWidth: width, innerHeight: height } = window;
        setHeightScreen(height);
    }, []);

    const onImageChange = (num: number) => {
        if (imageCount === images.length - 1 && num === 1) {
            setImageCount(0);
        } else if (imageCount === 0 && num === -1) {
            setImageCount(images.length - 1);
        } else {
            setImageCount(prev => num + prev);
        }
    };

    console.log("Image count", imageCount);

    return (
        <div className="min-h-[calc(100vh-100px)] overflow-hidden  flex flex-col relative">
            <div
                className={`max-w-[1100px] md:w-[1100px] flex flex-col   mx-auto  relative h-full md:mt-6 mt-14 flex-1 `}>
                <div
                    className={`flex  md:space-x-3 md:h-[420px] h-[375px]  ${
                        isCollapse && "hidden"
                    }`}>
                    <div className="flex-1 md:block hidden ">
                        <Avatar style="w-[370px] h-[370px] ml-4 " />
                    </div>
                    <div className="md:w-[595px] w-[370px] relative mx-auto">
                        <div className="relative md:w-full w-[276px] mx-auto">
                            <Rectangle
                                style={{
                                    position: "absolute",
                                    height: "44px",
                                    width: "100%",
                                }}
                            />
                            <p className="font-abel md:text-[16px] text-[12px] text-white absolute text-center left-0 right-0 md:top-[10px] top-[14px] ">
                                {images[imageCount].desc}
                            </p>
                        </div>
                        <div className="relative ">
                            <RoundedLine
                                style={{ position: "absolute", top: "22px" }}
                            />
                            <div className="absolute">
                                <div className="md:p-6 p-3.5 relative md:pt-16 pt-14">
                                    <img
                                        src={images[imageCount].img}
                                        className="w-full h-full rounded-xl "
                                    />
                                    <button
                                        onClick={() => onImageChange(-1)}
                                        className="absolute md:text-[20px] text-[16px] -left-5 top-[49%] md:w-[65px] md:h-[65px] w-[50px] h-[50px] bg-[#131E2F]/90 rounded-full flex items-center justify-center">
                                        <FaChevronLeft color="white " />
                                    </button>
                                    <button
                                        onClick={() => onImageChange(1)}
                                        className="absolute md:text-[20px] text-[16px] -right-5 top-[49%] md:w-[65px] md:h-[65px] w-[50px] h-[50px] bg-[#131E2F]/90 rounded-full flex items-center justify-center">
                                        <FaChevronRight color="white " />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
