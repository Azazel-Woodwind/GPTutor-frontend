import React from "react";
import Textfield from "@/components/common/input/Textfield";
import XForm from "@/components/application/XForm";
import RadioButton from "@/components/common/input/RadioButton";
import UserAPI from "@/api/UserAPI";
import { Link } from "react-router-dom";
import MultiTextfieldRow from "@/components/common/layout/MultiTextfieldRow";
import { useNotification } from "@/context/NotificationContext";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import {
    education_level_schema,
    email_schema,
    first_name_schema,
    last_name_schema,
    password_schema,
    subjects_schema,
} from "../../../lib/userFormSchema";
import { useAppData } from "@/context/AppDataContext";
import Select from "@/components/common/input/Select";
import TextWrapper from "@/components/utils/TextWrapper";
import LinkWrapper from "@/components/common/dataDisplay/LinkWrapper";
import PasswordSection from "@/components/application/PasswordSection";
import RadioButtonsContainer from "@/components/common/layout/RadioButtonContainer";

function Register() {
    const { subjectOptions, educationLevels } = useAppData();

    const sendNotification = useNotification();

    const RegisterSchema = React.useMemo(
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
                <SuccessScreen
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
                        name="subjects"
                        control={form.control}
                        render={({
                            field, // { onChange, onBlur, value, name, ref }
                            fieldState, //{ invalid, isTouched, isDirty, error }
                            formState,
                        }) => (
                            <Select
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
