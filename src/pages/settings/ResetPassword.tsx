import React from "react";
import styled from "styled-components";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "../RecoverPassword";
import { useNotification } from "../../context/NotificationContext";
import UserAPI from "../../api/UserAPI";
import PasswordSection from "../../components/Register/PasswordSection";
import CustomButton from "../../components/Button";

function ResetPassword() {
    const sendNotification = useNotification();

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
                label: "Password Successfully Changed!",
                duration: 5,
                type: "success",
            });
            form.reset();
        } catch (error) {
            console.log(error);
            sendNotification({
                label: "Error Changing Password",
                duration: 5,
                type: "error",
            });
        }
    };

    return (
        <Container onSubmit={form.handleSubmit(resetPassword)}>
            <Title> Change Password </Title>
            <CenteredColumn gap="10px">
                <PasswordSection form={form} />
            </CenteredColumn>
            <CustomButton
                disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                }>
                Change Password
            </CustomButton>
        </Container>
    );
}

const Container = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled.h1``;

const FormContainer = styled(CenteredColumn)`
    /* align-items: flex-start; */
    /* justify-content: flex-start; */
    /* padding-top: 100px; */
`;

export default ResetPassword;
