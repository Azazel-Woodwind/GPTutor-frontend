import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useMemo } from "react";
import useDynamicFields from "../hooks/useDynamicFields";

export enum Subject {
    MATHEMATICS = "Mathematics",
    PHYSICS = "Physics",
    CHEMISTRY = "Chemistry",
    BIOLOGY = "Biology",
}

export enum EducationLevel {
    GCSE = "GCSE",
    A_LEVEL = "A Level",
}

const maxLearningObjectives = 5;
const maxImages = 3;
const minLearningObjectives = 3;
const minImages = 1;

function LearningObjectiveImage({
    imageIndex,
    imageElements,
    deleteImage,
    learningObjectiveImages,
}) {
    const [Link, Description] = imageElements;

    return (
        <div>
            <div
                style={{
                    marginLeft: "2ch",
                    paddingBottom: "2ch",
                }}>
                <label
                    style={{
                        marginRight: "5px",
                    }}>
                    Image #{imageIndex + 1} <br />
                    {Link}
                </label>
                <label>
                    Description <br />
                    {Description}
                </label>

                <button
                    disabled={
                        learningObjectiveImages.elements.length <= minImages
                    }
                    onClick={() => deleteImage(imageIndex)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

function LearningObjective({
    index,
    register,
    learningObjectives,
    elements,
    imageUnwrappers,
    unregister,
    form,
}) {
    const [Title] = elements;

    const learningObjectiveImages = useDynamicFields({
        type: `images#${index + 1}`,
        formElements: [
            <input name="Link" placeholder="Link" />,
            <input name="Description" placeholder="Description" />,
        ],
        max: maxImages,
        min: minImages,
        form,
    });
    imageUnwrappers.current[index] = learningObjectiveImages.unwrap;

    return (
        <div
            style={{
                border: "1px solid black",
                padding: "1em",
            }}>
            <div>
                <button
                    disabled={
                        learningObjectives.elements.length <=
                        minLearningObjectives
                    }
                    onClick={e => learningObjectives.deleteField(index)}>
                    Delete
                </button>
                <div>
                    <h5>Learning objective #{index + 1}</h5>
                    {Title}
                    <h5> Images </h5>
                    {learningObjectiveImages.elements.map(
                        (imageElements, index) => (
                            <LearningObjectiveImage
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

                <button
                    disabled={
                        learningObjectiveImages.elements.length >= maxImages
                    }
                    onClick={learningObjectiveImages.addField}>
                    Add image
                </button>
            </div>
        </div>
    );
}

export default function DemoForm() {
    const form = useForm();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        unregister,
    } = form;

    // console.log(watch("images_0_1_Description"));

    const imageUnwrappers = React.useRef([]);
    const learningObjectives = useDynamicFields({
        formElements: [<input name="title" placeholder="title" />],
        max: maxLearningObjectives,
        min: minLearningObjectives,
        form,
    });

    const onSubmit = async data => {
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

        console.log(parsedObjectives);
    };

    // console.log(errors);
    // console.log(learningObjectives);
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}

            <label>
                Title <br />
                <input
                    {...register("title", { required: true, maxLength: 20 })}
                    placeholder="Title"
                />
            </label>
            <br />
            <label>
                Education Level: <br />
                <select {...register("educationLevel", { required: true })}>
                    {Object.keys(EducationLevel).map(educationLevel => (
                        <option value={educationLevel}>
                            {" "}
                            {educationLevel}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Subject: <br />
                <select {...register("subject")}>
                    {Object.keys(Subject).map(subject => (
                        <option value={subject}> {subject}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Description <br />
                <input
                    placeholder="Description"
                    {...register("description", {
                        required: true,
                        maxLength: 200,
                    })}
                />
            </label>
            <h3> Learning Objectives </h3>
            <div
                style={
                    {
                        // border: "2px solid black",
                    }
                }>
                {learningObjectives.elements.map((elements, index) => (
                    <LearningObjective
                        index={index}
                        register={register}
                        imageUnwrappers={imageUnwrappers}
                        elements={elements}
                        learningObjectives={learningObjectives}
                        form={form}
                    />
                ))}
            </div>

            <div>
                <button
                    disabled={
                        learningObjectives.elements.length >=
                        maxLearningObjectives
                    }
                    value="New objective"
                    onClick={learningObjectives.addField}>
                    Add new objective
                </button>
            </div>

            {/* include validation with required or other standard HTML validation rules */}
            {/* <input {...register("exampleRequired", { required: true })} /> */}
            <input type="submit" />
        </form>
    );
}
