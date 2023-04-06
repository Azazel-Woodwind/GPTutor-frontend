import { FaImage } from "react-icons/fa";
import { MIN_IMAGES } from "../../lib/FormData";

export default function LearningObjectiveImage({
    imageIndex,
    imageElements,
    deleteImage,
    learningObjectiveImages,
}) {
    const [Link, Description] = imageElements;

    const onClick = () => {
        if (learningObjectiveImages.elements.length <= MIN_IMAGES) return;
        deleteImage(imageIndex);
    };

    return (
        <div className="relative border border-[#50576E] p-5 my-2">
            <span
                onClick={onClick}
                className={`absolute top-0 bottom-0 right-0 cursor-${
                    learningObjectiveImages.elements.length <= MIN_IMAGES
                        ? "auto"
                        : "pointer"
                }`}>
                <svg
                    className={`fill-current h-8 w-8 text-${
                        learningObjectiveImages.elements.length <= MIN_IMAGES
                            ? "gray"
                            : "red"
                    }-600`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </span>
            <div className="mb-1">
                <h1>Image #{imageIndex + 1}</h1>
            </div>
            <div className="flex flex-row gap-10">
                <div className="" style={{ flexGrow: 1 }}>
                    <h1>File upload / Link</h1>
                    <div className="flex">
                        <div className="border border-[#50576E] mr-2 rounded-lg flex items-center m-auto rounded-lg cursor-pointer">
                            <FaImage color="#fff" size={28} />
                        </div>
                        {Link}
                    </div>
                </div>
                <div className="" style={{ flexGrow: 2 }}>
                    <h1>Image description</h1>
                    {Description}
                </div>
            </div>
        </div>
    );
}
