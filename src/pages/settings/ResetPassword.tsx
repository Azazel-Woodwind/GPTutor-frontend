import React from "react";
import { z } from "zod";
import { password_schema } from "../../lib/userFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordSection from "../../components/Register/PasswordSection";
import styled from "styled-components";
import CustomButton from "../../components/Button";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import UserAPI from "../../api/UserAPI";
import { useNotification } from "../../context/NotificationContext";
import XForm from "../../components/XForm";
import { useChatContext } from "../../context/ChatContext";
import useConversationDisplay from "../../hooks/useConversationDisplay";
import { useAuth } from "../../context/SessionContext";

export const ResetPasswordSchema = z
    .object({
        password: password_schema,
        confirm_password: z.string(),
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
    });

function Wrapper() {
    const { event } = useAuth();

    console.log(event);

    return <ResetPassword />;
}

function ResetPassword() {
    const sendNotification = useNotification();

    useConversationDisplay(false);

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    });

    const resetPassword = async data => {
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
            await UserAPI.updateMe({ password: data.password });
            sendNotification({
                label: "Password Successfully Reset!",
                duration: 5,
                type: "success",
            });
            form.reset();
        } catch (error) {
            console.log(error);
            sendNotification({
                label: "Error Resetting Password",
                duration: 5,
                type: "error",
            });
        }
    };
    return (
        <XForm
            onSubmit={form.handleSubmit(resetPassword)}
            // submitButtonText={
            //     "WARNING: Do NOT let your wife CATCH you using THIS application"
            // }
            submitButtonText={"Reset Password"}
            title={"Reset your password"}
            isValid={!form.formState.isValid || form.formState.isSubmitting}>
            <PasswordSection form={form} />
        </XForm>
    );
}

// const Container = styled.form`
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
// `;

// const Title = styled.h1``;

// const FormContainer = styled(CenteredColumn)`
//     /* align-items: flex-start; */
//     justify-content: flex-start;
//     /* padding-top: 100px; */
// `;

export default Wrapper;
