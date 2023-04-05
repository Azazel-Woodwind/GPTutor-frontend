import { FaPlus } from "react-icons/fa";
import { MAX_IMAGES, MIN_IMAGES, MIN_LEARNING_OBJECTIVES } from "../../Data";
import useDynamicFields from "../../hooks/useDynamicFields";
import LearningObjectiveImage from "./LearningObjectiveImage";

export default function LearningObjective({
    index,
    learningObjectives,
    elements,
    imageUnwrappers,
    form,
}) {
    const [Title] = elements;

    const learningObjectiveImages = useDynamicFields({
        formElements: [
            <textarea
                name="link"
                rows={1}
                style={{ resize: "none" }}
                className="w-full border-[#50576E] border rounded-lg bg-transparent px-3 py-1.5 text-[16px] outline-none"
            />,
            <textarea
                name="description"
                rows={1}
                style={{ resize: "none" }}
                className="w-full border-[#50576E] border rounded-lg bg-transparent px-3 py-1.5 text-[16px] outline-none"
            />,
        ],
        max: MAX_IMAGES,
        min: MIN_IMAGES,
        form,
    });
    imageUnwrappers.current[index] = learningObjectiveImages.unwrap;

    const deleteLearningObjective = () => {
        if (learningObjectives.elements.length <= MIN_LEARNING_OBJECTIVES)
            return;

        learningObjectives.deleteField(index);
    };

    return (
        <div className="relative border border-[#818aa8] my-2 p-5">
            <div className="">
                <span
                    onClick={deleteLearningObjective}
                    className={`absolute top-2 bottom-0 right-2 cursor-${
                        learningObjectives.elements.length <=
                        MIN_LEARNING_OBJECTIVES
                            ? "auto"
                            : "pointer"
                    }`}>
                    <svg
                        className={`fill-current h-8 w-8 text-${
                            learningObjectives.elements.length <=
                            MIN_LEARNING_OBJECTIVES
                                ? "gray"
                                : "red"
                        }-600`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                </span>
                <h5>Learning objective #{index + 1}</h5>
                <div className="my-3">{Title}</div>
                <h5>Images</h5>
                <div className="my-3">
                    {learningObjectiveImages.elements.map(
                        (imageElements, index) => (
                            <LearningObjectiveImage
                                key={index}
                                deleteImage={
                                    learningObjectiveImages.deleteField
                                }
                                imageElements={imageElements}
                                imageIndex={index}
                                learningObjectiveImages={
                                    learningObjectiveImages
                                }
                            />
                        )
                    )}
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <button
                    disabled={
                        learningObjectiveImages.elements.length >= MAX_IMAGES
                    }
                    onClick={e => {
                        e.preventDefault();
                        learningObjectiveImages.addField();
                    }}>
                    <FaPlus
                        color={
                            learningObjectiveImages.elements.length >=
                            MAX_IMAGES
                                ? "dimgray"
                                : "#4e57d5"
                        }
                        size={24}
                    />
                </button>
            </div>
        </div>
    );
}
