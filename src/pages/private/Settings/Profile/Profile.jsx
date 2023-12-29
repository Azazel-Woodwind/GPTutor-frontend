import React from "react";
import styled from "styled-components";
import Button from "@/components/common/input/Button";
import RadioButton from "@/components/common/input/RadioButton";
import { useAppData } from "@/context/AppDataContext";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/SessionContext";
import { capitaliseFirstLetter, formatEducationLevel } from "@/utils/string";
import { useNotification } from "@/context/NotificationContext";
import Textfield from "@/components/common/input/Textfield";
import MultiTextfieldRow from "@/components/common/layout/MultiTextfieldRow";
import Select from "@/components/common/input/MultiSelect";
import UserAPI from "@/api/UserAPI";
import RadioButtonsContainer from "@/components/common/layout/RadioButtonContainer";

/**
 * Profile Settings page.
 * User can change their profile settings.
 *
 * @page
 * @route /settings/profile
 * @accessLevel 1 - Student
 * @returns {JSX.Element} - Renders the profile settings.
 */
function Profile() {
    const { sendNotification } = useNotification();

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
                            style={{ maxWidth: "40rem" }}
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
}

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
