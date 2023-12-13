import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import LessonAPI from "../../../api/LessonAPI";
import CenteredColumn from "@/components/common/layout/CenteredColumn";
import styled from "styled-components";
import CenteredRow from "@/components/common/layout/CenteredRow";
import Textfield from "@/components/common/input/Textfield";
import RadioButton from "@/components/common/input/RadioButton";
import Button from "@/components/common/input/Button";
import Checkbox from "@/components/common/input/Checkbox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatEducationLevel, formatSubject } from "@/utils/string";
import DropdownList from "@/components/common/input/DropdownList";
import { useNotification } from "@/context/NotificationContext";
import { lessonFormSchema } from "@/lib/lessonFormSchema";
import { useAppData } from "@/context/AppDataContext";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "@/components/common/input/Select";
import LearningObjective from "./components/LearningObjective";
import ExitCreateLessonModal from "./components/ExitCreateLessonModal";
import { useNavigationBlocker } from "@/hooks/useNavigationBlocker/useNavigationBlocker";
import RadioButtonsContainer from "@/components/common/layout/RadioButtonContainer";

const CreateLessonForm = styled.form`
    margin: 0 auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
    padding-bottom: 2rem;
    width: 970px;
`;

const Container = styled.div`
    margin-left: 2rem;
    margin-right: 2rem;

    /* padding-bottom: 2rem; */
    /* width: 100%; */
    height: 100%;

    /* border: 5px solid red; */
`;

const defaultValues = {
    title: "",
    education_level: "",
    subject: "",
    exam_boards: [],
    caption: "",
    learning_objectives: Array(3).fill({
        description: "",
        instructions: [
            {
                instruction: "",
                media_link: "",
            },
        ],
    }),
    is_published: false,
};

function CreateLesson({ action }) {
    const { subjectOptions, educationLevels, examBoards } = useAppData();
    // console.log(examBoards);

    const [searchParams] = useSearchParams();
    const [lesson, setLesson] = React.useState(null);

    // useConversationDisplay(0.3);

    const sendNotification = useNotification();

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(
            lessonFormSchema({ subjectOptions, educationLevels, examBoards })
        ),
        defaultValues,
    });

    const is_published = form.watch("is_published");

    const { Prompt, setConfirmed, PromptProps } = useNavigationBlocker();

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
        // console.log("resetting form");
        if (action === "create") {
            form.reset(defaultValues);
        } else {
            setDefaultValues();
        }
    };

    const setDefaultValues = lessonArg => {
        const currentLesson = lessonArg || lesson;
        if (!currentLesson) return;
        console.log(currentLesson);

        form.reset({
            title: currentLesson.title || undefined,
            education_level: formatEducationLevel(
                currentLesson.education_level
            ),
            subject: formatSubject(currentLesson.subject) ?? "",
            exam_boards: currentLesson.exam_boards ?? [],
            caption: currentLesson.caption ?? "",
            learning_objectives: currentLesson.learning_objectives.map(
                objective => ({
                    description: objective.description,
                    instructions: objective.instructions.map(instruction => ({
                        instruction: instruction.instruction,
                        media_link: instruction.media_link,
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

                    setLesson(lesson);
                    setDefaultValues(lesson);
                })
                .catch(err => {
                    console.log(err);
                    sendNotification({
                        label: "Lesson not found",
                        duration: 5,
                        type: "error",
                    });
                    return navigate("/create-lesson");
                });
        }
    }, []);

    const onSubmit = async data => {
        console.log("FORM SUBMITTED");
        console.log(data);

        if (
            !lessonFormSchema({
                subjectOptions,
                educationLevels,
                examBoards,
            }).safeParse(data).success
        ) {
            console.log(form.formState.errors);
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
                subject: data.subject || null,
                caption: data.caption || null,
                exam_boards: data.exam_boards,
                education_level: data.education_level || null,
                learning_objectives: data.learning_objectives.filter(
                    objective =>
                        objective.description ||
                        objective.instructions.some(
                            instruction =>
                                instruction.instruction ||
                                instruction.media_link
                        )
                ),
                is_published: data.is_published,
            };
            console.log(lessonData);
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

            if (action === "create") {
                resetForm();
            }
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
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    // console.log(form.formState.isDirty);

    return (
        <Container>
            <CreateLessonForm onSubmit={form.handleSubmit(onSubmit)}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                    }}>
                    <h1 style={{ margin: 0 }}>Create Lesson</h1>
                    <Button
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
                    </Button>
                </div>
                <CenteredColumn gap="1rem">
                    <CenteredRow gap="1rem" fillwidth>
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
                                    style={{ width: "15.6rem" }}
                                />
                            )}
                        />
                    </CenteredRow>
                    <div style={{ width: "100%", paddingLeft: "5px" }}>
                        <Controller
                            name="exam_boards"
                            control={form.control}
                            render={({
                                field, // { onChange, onBlur, value, name, ref }
                                fieldState, //{ invalid, isTouched, isDirty, error }
                                formState,
                            }) => (
                                <CustomSelect
                                    // {...field}
                                    selected={field.value}
                                    setSelected={field.onChange}
                                    options={examBoards}
                                    defaultValue={[]}
                                    style={{ width: "50%" }}
                                />
                            )}
                        />
                    </div>

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
                            name="education_level"
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
                                        gap="1.5rem"
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
                        gap: "2rem",
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
                        marginBottom: "1rem",
                    }}>
                    <Button
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
                    </Button>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                    }}>
                    <div style={{ marginTop: "8px" }}>
                        <Controller
                            name="is_published"
                            control={form.control}
                            render={({ field }) => (
                                <Checkbox
                                    checkboxSize={31}
                                    borderWidth={2}
                                    fontSize="1.1rem"
                                    label="Publish this lesson"
                                    checked={field.value}
                                    onChange={e =>
                                        field.onChange(e.target.checked)
                                    }
                                />
                            )}
                        />
                    </div>

                    <Button
                        style={{ marginTop: "0.6rem", width: "100%" }}
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
                    </Button>
                </div>
            </CreateLessonForm>
            <Prompt when={form.formState.isDirty} {...PromptProps}>
                <ExitCreateLessonModal
                    setConfirmed={setConfirmed}
                    isPublished={is_published}
                    form={form}
                    onSubmit={onSubmit}
                />
            </Prompt>
        </Container>
    );
}

export default CreateLesson;
