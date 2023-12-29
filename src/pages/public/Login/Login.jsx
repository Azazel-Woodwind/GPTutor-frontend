import React from "react";
import { useNotification } from "@/context/NotificationContext";
import { useAuth } from "@/context/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "@/api/UserAPI";
import XForm from "@/components/application/XForm";
import Textfield from "@/components/common/input/Textfield";
import TextWrapper from "@/components/utils/TextWrapper";
import LinkWrapper from "@/components/common/dataDisplay/LinkWrapper";

/**
 * Page that allows users to login to their account.
 *
 * @page
 * @route /login
 * @public
 * @returns {JSX.Element} - Renders the login form
 */
function Login() {
    const { sendNotification } = useNotification();

    const emailInput = React.useRef(null);
    const passwordInput = React.useRef(null);

    const { session } = useAuth();

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
        } catch (error) {
            console.log(error.message);
            sendNotification({
                label: error.message,
                duration: 5,
                type: "error",
            });
        }
    };

    React.useEffect(() => {
        if (session) {
            console.log(session);
            // navigate("/hub");
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
