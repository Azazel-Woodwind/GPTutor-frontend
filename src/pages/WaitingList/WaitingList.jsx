import React from "react";
import { useAppData } from "../../context/AppDataContext";
import { useNotification } from "../../context/NotificationContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    education_level_schema,
    email_schema,
    first_name_schema,
    last_name_schema,
    occupation_schema,
    subjects_schema,
} from "../../lib/userFormSchema";
import UserAPI from "../../api/UserAPI";
import { generatePassword } from "../../lib/stringUtils";
import SuccessScreen from "../../components/SuccessScreen";
import XForm from "../../components/XForm";
import { MultiTextfieldRow } from "../../styles/containers/MultiTextfieldRow";
import Textfield from "../../components/input/Textfield";
import RadioButton from "../../components/input/RadioButton";
import RadioButtonsContainer from "../../styles/containers/RadioButtonContainer";
import { occupations } from "../../lib/FormData";

function WaitingList() {
    const [success, setSuccess] = React.useState(false);

    const { subjectOptions, educationLevels } = useAppData();
    const sendNotification = useNotification();

    const WaitingListSchema = React.useMemo(
        () =>
            z.object({
                first_name: first_name_schema,
                // last_name: last_name_schema,
                email: email_schema,
                // education_level: education_level_schema(educationLevels),
                occupation: occupation_schema(occupations),
                // subjects: subjects_schema(subjectOptions),
            }),
        []
    );

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(WaitingListSchema),
        defaultValues: {
            first_name: "",
            // last_name: "",
            email: "",
            // education_level: "",
            occupation: "",
            // subjects: [],
        },
    });

    const addToWaitingList = async data => {
        console.log(data);

        if (!form.formState.isValid) {
            sendNotification({
                label: "Please fill in all fields",
                duration: 5,
                type: "error",
            });
            return;
        }

        // data = data.map(field => field.trim());

        try {
            const user = await UserAPI.signUpToWaitingList({
                first_name: data.first_name,
                // last_name: data.last_name,
                email: data.email,
                // password: generatePassword(12),
                // education_level: data.education_level,
                is_student: data.occupation === "Student",
                // subjects: data.subjects,
            });

            // console.log(response);
            localStorage.setItem("waiting_list", "true");
            setSuccess(true);
        } catch (error) {
            console.log(error);

            sendNotification({
                label: error.message,
                duration: 5,
                type: "error",
            });
        }
    };

    return (
        <>
            {success ? (
                <SuccessScreen
                    heading="Thanks for signing up to our waiting list!"
                    caption="Be sure to check your email for the latest updates on XTUTOR!"
                />
            ) : (
                <XForm
                    onSubmit={form.handleSubmit(addToWaitingList)}
                    // submitButtonText={
                    //     "WARNING: Do NOT let your wife CATCH you using THIS application"
                    // }
                    submitButtonText="Join the XTUTOR Waiting List!"
                    title="Join the Waiting List!"
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
                                    // fullwidth
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
                        {/* <Controller
                            name="last_name"
                            control={form.control}
                            render={({
                                field, // { onChange, onBlur, value, name, ref }
                                fieldState, //{ invalid, isTouched, isDirty, error }
                                formState,
                            }) => (
                                <Textfield
                                    // fullwidth
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
                                    style={{
                                        flex: 1,
                                    }}
                                />
                            )}
                        /> */}
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
                                    style={{
                                        flex: 1,
                                    }}
                                />
                            )}
                        />
                    </MultiTextfieldRow>
                    {/* <Controller
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
                    /> */}
                    {/* <Controller
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
                    /> */}
                    <Controller
                        control={form.control}
                        name="occupation"
                        render={({
                            field, // { onChange, onBlur, value, name, ref }
                            fieldState, //{ invalid, isTouched, isDirty, error }
                            formState,
                        }) => (
                            <RadioButtonsContainer gap="1.5rem">
                                {occupations.map(occupation => (
                                    <RadioButton
                                        key={occupation}
                                        label={occupation}
                                        checked={field.value === occupation}
                                        onChange={e =>
                                            field.onChange(occupation)
                                        }
                                    />
                                ))}
                            </RadioButtonsContainer>
                        )}
                    />
                </XForm>
            )}
        </>
    );
}

export default WaitingList;
