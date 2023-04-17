import React, { useState } from "react";
import {
    MAX_LEARNING_OBJECTIVES,
    MIN_LEARNING_OBJECTIVES,
} from "../lib/FormData";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useDynamicFields from "../hooks/useDynamicFields";
import LearningObjective from "../components/CreateLesson/LearningObjective";
import LessonAPI from "../api/LessonAPI";
import CenteredColumn from "../styles/containers/CenteredColumn";
import styled from "styled-components";
import useDropdownList from "../hooks/useDropdownList";
import CenteredRow from "../styles/containers/CenteredRow";
import Textfield from "../components/Textfield";
import useConversationDisplay from "../hooks/useConversationDisplay";
import useRadioButtons from "../hooks/useRadioButtons";
import RadioButtonsContainer from "../styles/containers/HorizontalRadioButtonContainer";
import { TextWrapper } from "../styles/TextWrappers";
import CustomButton from "../components/Button";
import Checkbox from "../components/Checkbox";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { formatEducationLevel, formatSubject } from "../lib/stringUtils";
import RadioButton from "../components/RadioButton";
import DropdownList from "../components/DropdownList";

const CreateLessonForm = styled.form`
    margin: 0 auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    gap: 1em;
    padding: 0 1em;
`;

const Container = styled.div`
    overflow-y: auto;
    margin-top: 8em;
    margin-left: 2em;
    margin-right: 2em;

    padding-bottom: 2em;
    /* width: 100%; */
    height: 100%;
    overflow: auto;
`;

function CreateLesson({ action }) {
    const { subjectOptions, educationLevels } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const [lesson, setLesson] = useState(null);
    useConversationDisplay(0.3);

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            education_level: null,
            subject: "",
            caption: "",
            learning_objectives: Array(3).fill({
                title: "",
                images: [
                    {
                        link: "",
                        description: "",
                    },
                ],
            }),
            is_published: false,
        },
    });

    const learningObjectivesFields = useFieldArray({
        control: form.control,
        name: "learning_objectives",
    });

    const navigate = useNavigate();

    const resetForm = () => {
        form.reset();
    };

    const setDefaultValues = lessonArg => {
        const currentLesson = lessonArg || lesson;
        if (!currentLesson) return;

        form.reset({
            title: currentLesson.title,
            description: currentLesson.description,
            education_level: currentLesson.education_level,
            subject: formatSubject(currentLesson.subject),
            caption: currentLesson.caption,
            learning_objectives: currentLesson.learning_objectives.map(
                objective => ({
                    title: objective.title,
                    images: objective.images.map(image => ({
                        link: image.link,
                        description: image.description,
                    })),
                })
            ),
            is_published: currentLesson.is_published,
        });
    };

    React.useEffect(() => {
        resetForm();
        if (action === "edit") {
            const lessonID = searchParams.get("id");
            if (!lessonID) {
                toast.error("No Lesson ID Provided", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return navigate("/create-lesson");
            }
            LessonAPI.getMyLessonById(lessonID)
                .then(lesson => {
                    console.log(lesson);
                    if (!lesson) {
                        toast.error("Lesson not found", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        return navigate("/create-lesson");
                    }

                    setLesson(lesson);
                    setDefaultValues(lesson);
                })
                .catch(err => {
                    toast.error("Lesson not found", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    return navigate("/create-lesson");
                });
        }
    }, []);

    const onSubmit = async (data: any) => {
        console.log("FORM SUBMITTED");
        console.log(data);

        try {
            console.log(JSON.stringify(data, null, 2));
            let newLesson;
            if (action === "edit") {
                newLesson = await LessonAPI.updateOwnedByid(lesson.id, {
                    title: data.title,
                    subject: data.subject.toLowerCase() as Subject,
                    description: data.description,
                    caption: data.caption,
                    education_level:
                        data.education_level.toLowerCase() as EducationLevel,
                    learning_objectives: data.learning_objectives,
                    is_published: data.is_published,
                });
                toast.success("Lesson successfully updated!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                newLesson = await LessonAPI.create({
                    title: data.title,
                    subject: data.subject.toLowerCase() as Subject,
                    description: data.description,
                    caption: data.caption,
                    education_level:
                        data.education_level.toLowerCase() as EducationLevel,
                    learning_objectives: data.learning_objectives,
                    is_published: data.is_published,
                });
                toast.success("Lesson successfully created!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

            console.log(newLesson);

            resetForm();
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    };

    return (
        <Container>
            <CreateLessonForm onSubmit={form.handleSubmit(onSubmit)}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1em",
                    }}>
                    <h1 style={{ margin: 0 }}> Create Lesson </h1>
                    <CustomButton
                        onClick={e => {
                            e.preventDefault();
                            if (action === "edit") {
                                setDefaultValues();
                            } else {
                                resetForm();
                            }
                        }}
                        outline>
                        {action === "edit" ? "Reset defaults" : "Clear"}
                    </CustomButton>
                </div>

                <div style={{ display: "flex", gap: "1em" }}>
                    <CenteredColumn gap="1em">
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <Textfield
                                    fullwidth
                                    label="Title"
                                    type="text"
                                    required
                                    {...field}
                                />
                            )}
                        />

                        <CenteredRow gap="1em">
                            <Controller
                                control={form.control}
                                name={"education_level"}
                                render={({ field }) => (
                                    <RadioButtonsContainer gap="1.5em">
                                        {educationLevels.map(level => (
                                            <RadioButton
                                                key={level}
                                                label={level}
                                                checked={
                                                    field.value ===
                                                    level.toLowerCase()
                                                }
                                                onChange={e =>
                                                    field.onChange(
                                                        level.toLowerCase()
                                                    )
                                                }
                                            />
                                        ))}
                                    </RadioButtonsContainer>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name={"subject"}
                                render={({ field }) => (
                                    <DropdownList
                                        label="Subject"
                                        options={subjectOptions}
                                        selected={field.value}
                                        setSelected={field.onChange}
                                        required
                                    />
                                )}
                            />
                        </CenteredRow>
                    </CenteredColumn>
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <Textfield
                                label="Lesson Description"
                                width="430px"
                                multiline
                                // rows={5}
                                {...field}
                            />
                        )}
                    />
                </div>
                <Controller
                    name="caption"
                    control={form.control}
                    render={({ field }) => (
                        <Textfield
                            label="Caption"
                            type="text"
                            fullwidth
                            required
                            // rows={5}
                            {...field}
                        />
                    )}
                />
                <div
                    style={{
                        paddingTop: "1em",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2em",
                    }}>
                    {learningObjectivesFields.fields.map((objective, index) => (
                        <LearningObjective
                            form={form}
                            key={objective.id}
                            index={index}
                            learningObjectivesFields={learningObjectivesFields}
                        />
                    ))}
                </div>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        marginBottom: "1em",
                    }}>
                    <CustomButton
                        disabled={
                            learningObjectivesFields.fields.length >=
                            MAX_LEARNING_OBJECTIVES
                        }
                        onClick={e => {
                            e.preventDefault();
                            learningObjectivesFields.append({
                                title: "",
                                images: [
                                    {
                                        link: "",
                                        description: "",
                                    },
                                ],
                            });
                        }}
                        outline>
                        Add Learning Objective
                    </CustomButton>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1em",
                    }}>
                    <div style={{ marginTop: "8px" }}>
                        <Checkbox
                            checkboxSize={31}
                            borderWidth={2}
                            fontSize="1.1em"
                            label="Publish this lesson"
                            {...form.register("is_published")}
                        />
                    </div>

                    <CustomButton style={{ marginTop: "0.6em", width: "100%" }}>
                        {action === "edit" ? "Save changes" : "Create Lesson"}
                    </CustomButton>
                </div>
            </CreateLessonForm>
        </Container>
    );
}

export default CreateLesson;
