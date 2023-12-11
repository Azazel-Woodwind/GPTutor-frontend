import React from "react";
import { z } from "zod";
import { password_schema } from "../../../lib/userFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserAPI from "@/api/UserAPI";
import { useNotification } from "@/context/NotificationContext";
import XForm from "@/components/application/XForm";
import useConversationDisplay from "../../../hooks/useConversationDisplay";
import { useAuth } from "@/context/SessionContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import PasswordSection from "../../../components/application/PasswordSection";

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
    const location = useLocation();

    if (event !== "PASSWORD_RECOVERY") {
        return <Navigate to={"/hub"} state={{ from: location }} replace />;
    }

    return <RecoverPassword />;
}

function RecoverPassword() {
    const sendNotification = useNotification();

    useConversationDisplay(false);

    const navigate = useNavigate();

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
            navigate("/hub");
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
            isValid={!form.formState.isValid || form.formState.isSubmitting}
            style={{ position: "fixed" }}>
            <PasswordSection form={form} />
        </XForm>
    );
}

export default Wrapper;
