import React, { useEffect, useRef, useState } from "react";
import { Textfield } from "../components/Textfield";
import CenteredColumn from "../styles/containers/CenteredColumn";
import XForm from "../components/XForm";
import Centerer from "../styles/containers/Centerer";
import UserAPI from "../api/UserAPI";
import { Link, useNavigate } from "react-router-dom";
import { LinkWrapper, TextWrapper } from "../styles/TextWrappers";
import { useAuth } from "../context/SessionContext";
import { useNotification } from "../context/NotificationContext";

function Login() {
    const sendNotification = useNotification();

    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const { session } = useAuth();
    const navigate = useNavigate();

    const login = async e => {
        e.preventDefault();

        if (!emailInput?.current?.value || !passwordInput?.current?.value) {
            sendNotification({
                label: "Please fill in all fields",
                duration: 5,
                type: "error",
            });
            return;
        }

        try {
            const data = await UserAPI.signIn(
                emailInput.current.value,
                passwordInput.current.value
            );
            if (!data.session) {
                sendNotification({
                    label: "Invalid email or password",
                    duration: 5,
                    type: "error",
                });
                return;
            } else {
                sendNotification({
                    label: "Login successful!",
                    duration: 5,
                    type: "success",
                });
            }
        } catch (error: any) {
            console.log(error.message);
            sendNotification({
                label: error.message,
                duration: 5,
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (session) {
            navigate("/hub");
        }
    }, [session]);

    return (
        <XForm
            onSubmit={login}
            // submitButtonText={
            //     "WARNING: Do NOT let your wife CATCH you using THIS application"
            // }
            submitButtonText={"Login"}
            title={"Sign in to XTutor"}
            link={
                <Link to="/register">
                    <TextWrapper>
                        <LinkWrapper>No account? Register here</LinkWrapper>
                    </TextWrapper>
                </Link>
            }>
            <Textfield label="Email" type="text" required ref={emailInput} />
            <Textfield
                label="Password"
                type="password"
                required
                ref={passwordInput}
            />
        </XForm>
    );
}

export default Login;
