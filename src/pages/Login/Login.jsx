import React from "react";
import { useNotification } from "../../context/NotificationContext";
import { useAuth } from "../../context/SessionContext";
import {
    Link,
    useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import UserAPI from "../../api/UserAPI";
import XForm from "../../components/XForm";
import { LinkWrapper, TextWrapper } from "../../styles/TextWrappers";
import Textfield from "../../components/input/Textfield";

function Login() {
    const sendNotification = useNotification();

    const emailInput = React.useRef(null);
    const passwordInput = React.useRef(null);

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
