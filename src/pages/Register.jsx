import React, { useEffect, useMemo, useRef, useState } from "react";
import { Textfield } from "../components/Textfield";
import useRadioButtons from "../hooks/useRadioButtons";
import CenteredRow from "../styles/containers/CenteredRow";
import XForm from "../components/XForm";
import RadioButtonsContainer from "../styles/containers/HorizontalRadioButtonContainer";
import useCustomSelect from "../hooks/useCustomSelect";
import UserAPI from "../api/UserAPI";
import Centerer from "../styles/containers/Centerer";
import CenteredColumn from "../styles/containers/CenteredColumn";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";
import { LinkWrapper, TextWrapper } from "../styles/TextWrappers";
import { MultiTextfieldRow } from "../styles/containers/MultiTextfieldRow";
import {
    CONTAINS_LOWERCASE_REGEX,
    CONTAINS_NUMBER_REGEX,
    CONTAINS_SPECIAL_CHARACTER_REGEX,
    CONTAINS_UPPERCASE_REGEX,
    EMAIL_REGEX,
    NAME_REGEX,
    PASSWORD_LENGTH_REGEX,
} from "../lib/regexes";
import Notification from "./Notification";
import { useNotification } from "../context/NotificationContext";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import RadioButton from "../components/RadioButton";
import CustomSelect from "../components/CustomSelect";
import CustomButton from "../components/Button";
import PasswordSection from "../components/Register/PasswordSection";

import {
    education_level_schema,
    email_schema,
    first_name_schema,
    last_name_schema,
    occupation_schema,
    password_schema,
    subjects_schema,
} from "../lib/userFormSchema";
import { useAppData } from "../context/AppDataContext";
import { Ctxc } from "styled-icons/crypto";

function Register() {
    const { subjectOptions, educationLevels } = useAppData();

    const sendNotification = useNotification();

    const RegisterSchema = useMemo(
        () =>
            z
                .object({
                    first_name: first_name_schema,
                    last_name: last_name_schema,
                    email: email_schema,
                    password: password_schema,
                    confirm_password: z.string(),
                    education_level: education_level_schema(educationLevels),
                    subjects: subjects_schema(subjectOptions),
                })
                .superRefine(({ confirm_password, password }, ctx) => {
                    try {
                        password_schema.parse(password); // Check if the password field is valid
                        if (confirm_password !== password) {
                            ctx.addIssue({
                                code: "custom",
                                message: "Must match password",
                                path: ["confirm_password"],
                            });
                        }
                    } catch (error) {
                        if (error instanceof z.ZodError) {
                            ctx.addIssue({
                                code: "custom",
                                message: "Password is not valid",
                                path: ["confirm_password"],
                            });
                        } else {
                            throw error;
                        }
                    }
                }),
        []
    );

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            education_level: "",
            subjects: [],
        },
    });

    const register = async data => {
        console.log("FORM SUBMITTED");
        console.log(data);

        if (!form.formState.isValid) {
            sendNotification({
                label: "Please fill in all fields",
                duration: 5,
                type: "error",
            });
            throw new Error("Form is not valid");
        }

        data = data.map(field => field.trim());

        try {
            const response = await UserAPI.signUp({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                education_level: data.education_level,
                subjects: data.subjects,
                is_active: true,
            });

            console.log(response);
        } catch (error) {
            console.log(error);
            sendNotification({
                label: "Something went wrong?",
                duration: 5,
                type: "error",
            });
            throw error;
        }
    };

    return (
        <>
            {form.formState.isSubmitSuccessful ? (
                <Notification
                    heading="Thanks for signing up!"
                    caption="Please check your inbox to confirm your email."
                />
            ) : (
                <XForm
                    onSubmit={form.handleSubmit(register)}
                    // submitButtonText={
                    //     "WARNING: Do NOT let your wife CATCH you using THIS application"
                    // }
                    submitButtonText={"Register"}
                    title={"Create your account"}
                    link={
                        <Link to="/login">
                            <TextWrapper>
                                <LinkWrapper>
                                    Already have an account?
                                </LinkWrapper>
                            </TextWrapper>
                        </Link>
                    }
                    isValid={
                        !form.formState.isValid || form.formState.isSubmitting
                    }>
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
                                    onChange={e => {
                                        field.onChange(e.target.value.trim());
                                    }}
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
                                    onChange={e => {
                                        field.onChange(e.target.value.trim());
                                    }}
                                />
                            )}
                        />
                    </MultiTextfieldRow>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({
                            field, // { onChange, onBlur, value, name, ref }
                            fieldState, //{ invalid, isTouched, isDirty, error }
                            formState,
                        }) => (
                            <Textfield
                                fullwidth
                                label="Email"
                                type="text"
                                required
                                error={fieldState.invalid}
                                helperText={
                                    fieldState.invalid &&
                                    fieldState.error?.message
                                }
                                {...field}
                                onChange={e => {
                                    field.onChange(e.target.value.trim());
                                }}
                            />
                        )}
                    />
                    <PasswordSection form={form} />
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
                        name="subjects"
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
                                options={subjectOptions}
                                defaultValue={[]}
                            />
                        )}
                    />
                </XForm>
            )}
        </>
    );
}

export default React.memo(Register);
