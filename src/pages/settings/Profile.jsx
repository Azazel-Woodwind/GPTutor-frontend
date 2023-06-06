import React from "react";
import styled from "styled-components";
import CustomButton from "../../components/Button";
import { Textfield } from "../../components/Textfield";
import RadioButtonsContainer from "../../styles/containers/HorizontalRadioButtonContainer";
import RadioButton from "../../components/RadioButton";
import { useAppData } from "../../context/AppDataContext";
import CustomSelect from "../../components/CustomSelect";
import { Controller, useForm } from "react-hook-form";
import { MultiTextfieldRow } from "../../styles/containers/MultiTextfieldRow";
import { useAuth } from "../../context/SessionContext";
import {
    capitaliseFirstLetter,
    formatEducationLevel,
} from "../../lib/stringUtils";

const Profile = () => {
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

    return (
        <Container>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                <h1> Profile Settings </h1>
                <CustomButton outline>Reset Defaults</CustomButton>
            </div>
            <FormContainer>
                <MultiTextfieldRow gap="0.8em">
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
                        <RadioButtonsContainer gap="1.5em">
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
                        <CustomSelect
                            // {...field}
                            style={{ maxWidth: "600px" }}
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
                <CustomButton disabled={!form.formState.isDirty}>
                    Save your changes
                </CustomButton>
            </FormContainer>
        </Container>
    );
};

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
export default Profile;
