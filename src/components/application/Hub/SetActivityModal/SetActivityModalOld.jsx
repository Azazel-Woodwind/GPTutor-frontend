import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextWrapper from "@/components/utils/TextWrapper";
import * as z from "zod";
import {
    education_level_schema,
    subject_schema,
} from "@/lib/schemas/userFormSchema";
import RadioButton from "@/components/common/input/RadioButton/RadioButton";
import { useAppData } from "@/context/AppDataContext";
import styled, { css } from "styled-components";
import CenteredColumn from "@/components/common/layout/CenteredColumn";
import CenteredRow from "@/components/common/layout/CenteredRow";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/input/Button/Button";
import DropdownList from "@/components/common/input/DropdownLists/BasicDropdownList/BasicDropdownList";
import RadioButtonsContainer from "@/components/common/layout/RadioButtonContainer";

const SubjectTopics = {
    Mathematics: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
    Physics: ["Mechanics", "Electricity", "Magnetism", "Thermodynamics"],
    Chemistry: ["Organic", "Inorganic", "Physical", "Analytical"],
    Biology: ["Botany", "Zoology", "Genetics", "Ecology"],
};

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
    gap: 1.25rem;
`;

const ButtonRow = styled(CenteredRow)`
    gap: 2.5rem;
`;

function SetActivityModalOld({ handleClose, X }) {
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
        <ModalContainer fillparent gap="1.25rem">
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
                        <RadioButtonsContainer gap="1.5rem">
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
                            style={{ width: "15.6rem" }}
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
                            style={{ width: "15.6rem" }}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="activity"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <DropdownList
                            label="Activity"
                            options={[
                                "Discussion",
                                "Quiz",
                                "Revision Notes",
                                "Debate",
                            ]}
                            selected={field.value}
                            setSelected={field.onChange}
                            required
                            error={fieldState.invalid}
                            helperText={
                                fieldState.invalid && fieldState.error?.message
                            }
                            fullwidth
                            style={{ width: "15.6rem" }}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="activity"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <RadioButtonsContainer gap="1.5rem">
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

export default SetActivityModalOld;
