import React from "react";
import XForm from "../components/XForm";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "./settings/ResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordSection from "../components/Register/PasswordSection";
import { useNotification } from "../context/NotificationContext";
import UserAPI from "../api/UserAPI";
import CustomButton from "../components/Button";
import useConversationDisplay from "../hooks/useConversationDisplay";
import { useHeader } from "../context/HeaderContext";
import { useNavigate } from "react-router-dom";
import supabase from "../api/configs/supabase";

function ActivateAccount() {
    const navigate = useNavigate();

    const sendNotification = useNotification();

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    });

    const activate = async data => {
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
            await UserAPI.activateMe(data.password);
            sendNotification({
                label: "Account successfully activated!",
                duration: 5,
                type: "success",
            });
            form.reset();
            await supabase.auth.refreshSession();
            // navigate("/hub");
        } catch (error) {
            console.log(error);
            sendNotification({
                label: "Error activating account",
                duration: 5,
                type: "error",
            });
        }
    };

    return (
        <XForm
            onSubmit={form.handleSubmit(activate)}
            // submitButtonText={
            //     "WARNING: Do NOT let your wife CATCH you using THIS application"
            // }
            submitButtonText={"Activate"}
            title={"Activate your account"}
            isValid={!form.formState.isValid || form.formState.isSubmitting}>
            <PasswordSection form={form} />
        </XForm>
    );
}

export default ActivateAccount;
