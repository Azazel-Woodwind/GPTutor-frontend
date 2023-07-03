import React from "react";
import styled from "styled-components";
import Button from "../../../components/input/Button";
import { Textfield } from "../../../components/input/Textfield";
import RadioButtonsContainer from "../../../styles/containers/RadioButtonContainer";
import RadioButton from "../../../components/input/RadioButton";
import { useAppData } from "../../../context/AppDataContext";
import Select from "../../../components/input/Select";
import { Controller, useForm } from "react-hook-form";
import { MultiTextfieldRow } from "../../../styles/containers/MultiTextfieldRow";
import { useAuth } from "../../../context/SessionContext";
import {
    capitaliseFirstLetter,
    formatEducationLevel,
} from "../../../lib/stringUtils";
import UserAPI from "../../../api/UserAPI";
import { useNotification } from "../../../context/NotificationContext";

const Profile = () => {
    const sendNotification = useNotification();

    const { subjectOptions, educationLevels } = useAppData();
    const { session } = useAuth();
    // console.log(session);

    const form = useForm({
        defaultValues: {
            first_name: session.user.user_metadata.first_name,
            last_name: session.user.user_metadata.last_name,
            education_level: formatEducationLevel(
                session.user.user_metadata.education_level
            ),
            subjects: session.user.user_metadata.subjects
                .map(subject =>
                    capitaliseFirstLetter(
                        subject.replaceAll("_", " ").replaceAll("ict", "ICT")
                    )
                )
                .sort(),
        },
    });

    const onSubmit = async data => {
        try {
            await UserAPI.updateMe(data);
            sendNotification({
                label: "Profile updated successfully!",
                type: "success",
            });
        } catch (error) {
            console.log(error);
            sendNotification({
                message: "Something went wrong",
                type: "error",
            });
        }
    };

    return (
        <Container>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                <h1> Profile Settings </h1>
                <Button outline>Reset Defaults</Button>
            </div>
            <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
                <MultiTextfieldRow gap="0.8rem">
                    <Controller
                        name="first_name"
                        control={form.control}
                        render={({
                            field, // { onChange, onBlur, value, name, ref }
                            fieldState, //{ invalid, isTouched, isDirty, error }
                            formState,
                        }) => (
                            <Textfield
                                fullwidth
                                label="First Name"
                                type="text"
                                required
                                autoComplete="new-password" // to prevent autocomplete for testing purposes
                                error={fieldState.invalid}
                                helperText={
                                    fieldState.invalid &&
                                    fieldState.error?.message
                                }
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="last_name"
                        control={form.control}
                        render={({
                            field, // { onChange, onBlur, value, name, ref }
                            fieldState, //{ invalid, isTouched, isDirty, error }
                            formState,
                        }) => (
                            <Textfield
                                fullwidth
                                label="Last Name"
                                type="text"
                                required
                                error={fieldState.invalid}
                                helperText={
                                    fieldState.invalid &&
                                    fieldState.error?.message
                                }
                                {...field}
                            />
                        )}
                    />
                </MultiTextfieldRow>
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
                                    checked={
                                        formatEducationLevel(field.value) ===
                                        level
                                    }
                                    onChange={e => field.onChange(level)}
                                />
                            ))}
                        </RadioButtonsContainer>
                    )}
                />
                <Controller
                    name="subjects"
                    control={form.control}
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <Select
                            // {...field}
                            style={{ maxWidth: "37.5rem" }}
                            selected={field.value.map(subject =>
                                capitaliseFirstLetter(
                                    subject
                                        .replaceAll("_", " ")
                                        .replaceAll("ict", "ICT")
                                )
                            )}
                            setSelected={newSubjects => {
                                field.onChange(newSubjects.sort());
                            }}
                            options={subjectOptions}
                        />
                    )}
                />
                <Button disabled={!form.formState.isDirty}>
                    Save your changes
                </Button>
            </FormContainer>
        </Container>
    );
};

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export default Profile;
