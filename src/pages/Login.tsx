import React, { useEffect, useRef, useState } from "react";
import { Textfield } from "../components/Textfield";
import CenteredColumn from "../styles/containers/CenteredColumn";
import XForm from "../components/XForm";
import { toast } from "react-toastify";
import Centerer from "../styles/containers/Centerer";
import UserAPI from "../api/UserAPI";
import { Link, useNavigate } from "react-router-dom";
import { LinkWrapper, TextWrapper } from "../styles/TextWrappers";
import { useAuth } from "../context/SessionContext";

function WaitingList() {
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const { session } = useAuth();
    const navigate = useNavigate();

    const login = async e => {
        e.preventDefault();

        if (!emailInput?.current?.value || !passwordInput?.current?.value) {
            toast.error("deez FUCKING nuts", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        try {
            const data = await UserAPI.signIn(
                emailInput.current.value,
                passwordInput.current.value
            );
            if (!data.session) {
                toast.error("Invalid email or password.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            } else {
                toast.success("You are logged in!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
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
            submitButtonText={
                "WARNING: Do NOT let your wife CATCH you using THIS application"
            }
            title={"Sign in to XTutor"}
            link={
                <Link to="/register">
                    <TextWrapper>
                        <LinkWrapper>No father?</LinkWrapper>
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

export default WaitingList;
