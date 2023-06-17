import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextWrapper } from "../../../styles/TextWrappers";
import * as z from "zod";
import {
    education_level_schema,
    subject_schema,
} from "../../../lib/userFormSchema";
import RadioButtonsContainer from "../../../styles/containers/RadioButtonContainer";
import RadioButton from "../../input/RadioButton";
import { useAppData } from "../../../context/AppDataContext";
import styled from "styled-components";
import CenteredColumn from "../../../styles/containers/CenteredColumn";
import CenteredRow from "../../../styles/containers/CenteredRow";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../input/Button";
import DropdownList from "../../input/DropdownList";

const SubjectTopics = {
    Mathematics: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
    Physics: ["Mechanics", "Electricity", "Magnetism", "Thermodynamics"],
    Chemistry: ["Organic", "Inorganic", "Physical", "Analytical"],
    Biology: ["Botany", "Zoology", "Genetics", "Ecology"],
};

function SetActivityModal({ handleClose, X }) {
    const { subjectOptions, educationLevels } = useAppData();

    const SetActivitySchema = React.useMemo(
        () =>
            z.object({
                education_level: education_level_schema(educationLevels),
                subject: subject_schema(subjectOptions),
                topic: z.string().nonempty(),
                activity: z.string().nonempty(),
            }),
        []
    );

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(SetActivitySchema),
        defaultValues: {
            education_level: "",
            subject: "",
            topic: "",
            activity: "",
        },
    });

    const subject = form.watch("subject");

    const onSubmit = async data => {
        if (data.activity === "Discussion") {
            X.sendMessage({
                message: `Let's have a discussion on ${data.topic} from ${data.education_level} ${data.subject}!`,
            });
        } else if (data.activity === "Quiz") {
            X.sendMessage({
                message: `Please quiz me on ${data.topic} from ${data.education_level} ${data.subject}!`,
            });
        } else if (data.activity === "Revision Notes") {
            X.sendMessage({
                message: `Please give me comprehensive revision notes on ${data.topic} from ${data.education_level} ${data.subject}!`,
            });
        } else if (data.activity === "Debate") {
            X.sendMessage({
                message: `Let's have a debate on ${data.topic} from ${data.education_level} ${data.subject}!`,
            });
        }

        handleClose();
    };

    return (
        <ModalContainer fillparent gap="20px">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Set an activity with X!
            </TextWrapper>
            <Content>
                <Controller
                    control={form.control}
                    name="education_level"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <RadioButtonsContainer gap="1.5em">
                            {educationLevels.map(level => (
                                <RadioButton
                                    key={level}
                                    label={level}
                                    checked={field.value === level}
                                    onChange={e => field.onChange(level)}
                                />
                            ))}
                        </RadioButtonsContainer>
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
                                fieldState.invalid && fieldState.error?.message
                            }
                            fullwidth
                            style={{ width: "250px" }}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="topic"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <DropdownList
                            label="Topic"
                            options={SubjectTopics[subject] || []}
                            selected={field.value}
                            setSelected={field.onChange}
                            required
                            error={fieldState.invalid}
                            helperText={
                                fieldState.invalid && fieldState.error?.message
                            }
                            fullwidth
                            style={{ width: "250px" }}
                        />
                    )}
                />
                {/* <Controller
                    control={form.control}
                    name="activity"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <DropdownList
                            label="Activity"
                            options={["Discussion", "Quiz", "Revision Notes", "Debate"]}
                            selected={field.value}
                            setSelected={field.onChange}
                            required
                            error={fieldState.invalid}
                            helperText={
                                fieldState.invalid && fieldState.error?.message
                            }
                            fullwidth
                            style={{ width: "250px" }}
                        />
                    )}
                /> */}
                <Controller
                    control={form.control}
                    name="activity"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <RadioButtonsContainer gap="1.5em">
                            {[
                                "Discussion",
                                "Quiz",
                                "Revision Notes",
                                "Debate",
                            ].map(activity => (
                                <RadioButton
                                    key={activity}
                                    label={activity}
                                    checked={field.value === activity}
                                    onChange={e => field.onChange(activity)}
                                />
                            ))}
                        </RadioButtonsContainer>
                    )}
                />
            </Content>
            <ButtonRow>
                <Button onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={
                        !form.formState.isValid ||
                        form.formState.isSubmitting ||
                        X.streaming ||
                        X.loading
                    }>
                    <TextWrapper fontSize="lg">Confirm</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

const ModalContainer = styled(CenteredColumn)`
    /* justify-content: flex-start; */
    flex: 1;
    position: relative;
`;

const Content = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    gap: 20px;
`;

const ButtonRow = styled(CenteredRow)`
    gap: 40px;
`;

export default SetActivityModal;
