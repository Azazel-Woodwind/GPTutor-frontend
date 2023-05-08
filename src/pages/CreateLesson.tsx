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
import Textfield, { ErrorText } from "../components/Textfield";
import useConversationDisplay from "../hooks/useConversationDisplay";
import useRadioButtons from "../hooks/useRadioButtons";
import RadioButtonsContainer from "../styles/containers/HorizontalRadioButtonContainer";
import { TextWrapper } from "../styles/TextWrappers";
import CustomButton from "../components/Button";
import Checkbox from "../components/Checkbox";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { formatEducationLevel, formatSubject } from "../lib/stringUtils";
import RadioButton from "../components/RadioButton";
import DropdownList from "../components/DropdownList";
import { useNotification } from "../context/NotificationContext";
import Prompt from "../components/Prompt";
import { lessonFormSchema } from "../lib/lessonFormSchema";
import { useAppData } from "../context/AppDataContext";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateLessonForm = styled.form`
    margin: 0 auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0 1em;
    padding-bottom: 2em;
    width: 970px;
`;

const Container = styled.div`
    margin-left: 2em;
    margin-right: 2em;

    /* padding-bottom: 2em; */
    /* width: 100%; */
    height: 100%;

    /* border: 5px solid red; */
`;

const onLeaveMessage =
    "Are you sure you want to leave? Your changes will be lost.";

const defaultValues = {
    title: "",
    education_level: "",
    subject: "",
    exam_board: "",
    caption: "",
    learning_objectives: Array(3).fill({
        title: "",
        description: "",
        images: [
            {
                link: "",
                description: "",
            },
        ],
    }),
    is_published: false,
};

function CreateLesson({ action }) {
    const { subjectOptions, educationLevels, examBoards } = useAppData();
    // console.log(examBoards);

    const [searchParams, setSearchParams] = useSearchParams();
    const [lesson, setLesson] = useState(null);
    const [valid, setValid] = useState(false);

    useConversationDisplay(0.3);

    const sendNotification = useNotification();

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(
            lessonFormSchema({ subjectOptions, educationLevels, examBoards })
        ),
        defaultValues,
    });

    const is_published = form.watch("is_published");

    React.useEffect(() => {
        if (action === "create") {
            resetForm();
        }
    }, [action]);

    React.useEffect(() => {
        form.trigger();
    }, [is_published]);

    const learningObjectivesFields = useFieldArray({
        control: form.control,
        name: "learning_objectives",
    });

    const navigate = useNavigate();

    const resetForm = () => {
        console.log("resetting form");
        form.reset(defaultValues);
    };

    const setDefaultValues = lessonArg => {
        const currentLesson = lessonArg || lesson;
        if (!currentLesson) return;

        form.reset({
            title: currentLesson.title,
            education_level: currentLesson.education_level,
            subject: formatSubject(currentLesson.subject),
            exam_board: currentLesson.exam_board ?? "",
            caption: currentLesson.caption,
            learning_objectives: currentLesson.learning_objectives.map(
                objective => ({
                    title: objective.title,
                    description: objective.description,
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
            // console.log("here");
            const lessonID = searchParams.get("id");
            if (!lessonID) {
                sendNotification({
                    label: "No Lesson ID Provided",
                    duration: 5,
                    type: "error",
                });
                return navigate("/create-lesson");
            }
            LessonAPI.getLessonById(lessonID)
                .then(lesson => {
                    console.log(lesson);
                    if (!lesson) {
                        sendNotification({
                            label: "Lesson not found",
                            duration: 5,
                            type: "error",
                        });
                        return navigate("/create-lesson");
                    }

                    setLesson(lesson);
                    setDefaultValues(lesson);
                })
                .catch(err => {
                    sendNotification({
                        label: "Lesson not found",
                        duration: 5,
                        type: "error",
                    });
                    return navigate("/create-lesson");
                });
        }
    }, []);

    const onSubmit = async (data: any) => {
        console.log("FORM SUBMITTED");
        console.log(data);

        if (!form.formState.isValid) {
            sendNotification({
                label: "Form is invalid",
                duration: 5,
                type: "error",
            });
            throw new Error("Form is not valid");
        }

        try {
            // console.log(JSON.stringify(data, null, 2));
            const lessonData = {
                title: data.title || null,
                subject: (data.subject.toLowerCase() as Subject) || null,
                caption: data.caption || null,
                exam_board: data.exam_board || null,
                education_level:
                    (data.education_level?.toLowerCase() as EducationLevel) ||
                    null,
                learning_objectives: data.learning_objectives,
                is_published: data.is_published,
            };
            let newLesson;
            if (action === "edit") {
                newLesson = await LessonAPI.updateOwnedByid(
                    lesson.id,
                    lessonData
                );
                sendNotification({
                    label: "Lesson successfully updated!",
                    duration: 5,
                    type: "success",
                });
            } else {
                newLesson = await LessonAPI.create(lessonData);
                sendNotification({
                    label: is_published
                        ? action === "edit"
                            ? "Lesson successfully saved and published!"
                            : "Lesson successfully created and published!"
                        : "Draft successfully saved!",
                    duration: 5,
                    type: "success",
                });
            }

            console.log(newLesson);

            resetForm();
        } catch (error) {
            console.log(JSON.stringify(error));

            sendNotification({
                label: `There was an error ${
                    action === "edit" ? "updating" : "creating"
                } the lesson.`,
                duration: 5,
                type: "error",
            });

            throw error;
        }
    };

    React.useEffect(() => {
        const subscription = form.watch((value, { name, type }) => {
            const result = lessonFormSchema({
                subjectOptions,
                educationLevels,
                examBoards,
            }).safeParse(value);
            // console.log(value);
            setValid(result.success);
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

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
                        record
                        outline>
                        {action === "edit" ? "Reset defaults" : "Clear"}
                    </CustomButton>
                </div>
                <CenteredColumn gap="1em">
                    <CenteredRow gap="1em" fillwidth>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({
                                field, // { onChange, onBlur, value, name, ref }
                                fieldState, //{ invalid, isTouched, isDirty, error }
                                formState,
                            }) => (
                                <Textfield
                                    label="Title"
                                    type="text"
                                    required
                                    error={fieldState.invalid}
                                    helperText={
                                        fieldState.invalid &&
                                        fieldState.error?.message
                                    }
                                    style={{ flex: 1 }}
                                    {...field}
                                />
                            )}
                        />
                        <CenteredRow gap="1em" style={{ flex: 1 }}>
                            <Controller
                                control={form.control}
                                name="subject"
                                render={({
                                    field, // { onChange, onBlur, value, name, ref }
                                    fieldState, //{ invalid, isTouched, isDirty, error }
                                    formState,
                                }) => (
                                    <DropdownList
                                        label="Subject"
                                        options={subjectOptions}
                                        selected={field.value}
                                        setSelected={field.onChange}
                                        required
                                        error={fieldState.invalid}
                                        helperText={
                                            fieldState.invalid &&
                                            fieldState.error?.message
                                        }
                                        fullwidth
                                    />
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="exam_board"
                                render={({
                                    field, // { onChange, onBlur, value, name, ref }
                                    fieldState, //{ invalid, isTouched, isDirty, error }
                                    formState,
                                }) => (
                                    <DropdownList
                                        label="Exam Board"
                                        options={examBoards}
                                        selected={field.value}
                                        setSelected={field.onChange}
                                        required
                                        error={fieldState.invalid}
                                        helperText={
                                            fieldState.invalid &&
                                            fieldState.error?.message
                                        }
                                        fullwidth
                                    />
                                )}
                            />
                        </CenteredRow>
                    </CenteredRow>

                    <Controller
                        name="caption"
                        control={form.control}
                        render={({
                            field, // { onChange, onBlur, value, name, ref }
                            fieldState, //{ invalid, isTouched, isDirty, error }
                            formState,
                        }) => (
                            <Textfield
                                label="Caption"
                                type="text"
                                fullwidth
                                required
                                error={fieldState.invalid}
                                helperText={
                                    fieldState.invalid &&
                                    fieldState.error?.message
                                }
                                // rows={5}
                                {...field}
                            />
                        )}
                    />
                    <div
                        style={{
                            width: "100%",
                            paddingLeft: "3px",
                            // border: "5px solid red",
                        }}>
                        <Controller
                            control={form.control}
                            name={"education_level"}
                            render={({
                                field, // { onChange, onBlur, value, name, ref }
                                fieldState, //{ invalid, isTouched, isDirty, error }
                                formState,
                            }) => (
                                <div
                                    style={{
                                        minHeight: "64px",
                                        // border: "2px solid red",
                                    }}>
                                    <RadioButtonsContainer
                                        gap="1.5em"
                                        style={{
                                            height: "64px",
                                            // border: "2px solid blue",
                                            alignItems: "center",
                                            // justifyContent: "center",
                                            flex: "1 0 auto",
                                            margin: 0,
                                        }}>
                                        {educationLevels.map(level => (
                                            <RadioButton
                                                key={level}
                                                label={level}
                                                checked={field.value === level}
                                                onChange={e =>
                                                    field.onChange(level)
                                                }
                                            />
                                        ))}
                                    </RadioButtonsContainer>
                                    {fieldState.invalid &&
                                        fieldState.error?.message && (
                                            <ErrorText>
                                                {fieldState.error?.message}
                                            </ErrorText>
                                        )}
                                </div>
                            )}
                        />
                    </div>
                </CenteredColumn>

                <div
                    style={{
                        // paddingTop: "5px",
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
                        <Controller
                            name="is_published"
                            control={form.control}
                            render={({ field }) => (
                                <Checkbox
                                    checkboxSize={31}
                                    borderWidth={2}
                                    fontSize="1.1em"
                                    label="Publish this lesson"
                                    checked={field.value}
                                    onChange={e =>
                                        field.onChange(e.target.checked)
                                    }
                                />
                            )}
                        />
                    </div>

                    <CustomButton
                        style={{ marginTop: "0.6em", width: "100%" }}
                        disabled={
                            form.formState.isSubmitting ||
                            !(
                                form.formState.isValid &&
                                (is_published ? true : form.formState.isDirty)
                            )
                        }>
                        {is_published
                            ? action === "edit"
                                ? "Save and Publish Lesson"
                                : "Create and publish Lesson"
                            : "Save Lesson as Draft"}
                    </CustomButton>
                </div>
            </CreateLessonForm>
            <Prompt when={form.formState.isDirty} message={onLeaveMessage} />
        </Container>
    );
}

export default CreateLesson;
