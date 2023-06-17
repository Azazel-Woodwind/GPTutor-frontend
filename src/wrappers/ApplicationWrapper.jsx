import {
    Outlet,
    useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import styled from "styled-components";
import { useAuth } from "../context/SessionContext";
import React from "react";
import RequireUser from "./RequireUser";
import RouteProtector from "./RouteProtector";
import { SocketContextProvider } from "../context/SocketContext";
import { ChatContextProvider } from "../context/ChatContext";
import Header from "../components/Header/Header";
import { STUDENT_ACCESS_LEVEL } from "../lib/accessLevels";
import XChat from "../components/Chat/XChat/XChat";

const ApplicationWrapperStyle = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
`;

const ApplicationInternalStyle = styled.div`
    height: 100vh;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
`;

function ApplicationWrapper() {
    const { event } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (event === "PASSWORD_RECOVERY") {
            navigate("/reset-password");
        }
    }, [event]);

    return (
        <RequireUser>
            <RouteProtector
                accessLevel={STUDENT_ACCESS_LEVEL}
                redirect={"/activate"}>
                <SocketContextProvider>
                    <ApplicationWrapperStyle>
                        <ChatContextProvider>
                            <ApplicationInternalStyle>
                                <Header />
                                <Outlet />
                            </ApplicationInternalStyle>
                            <XChat />
                        </ChatContextProvider>
                    </ApplicationWrapperStyle>
                </SocketContextProvider>
            </RouteProtector>
        </RequireUser>
    );
}

export default ApplicationWrapper;
