import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "@/context/SessionContext";
import React from "react";
import RequireUser from "../../components/auth/RequireUser";
import RouteProtector from "@/components/auth/RouteProtector";
import { SocketContextProvider } from "../../context/SocketContext";
import { ChatContextProvider } from "../../context/ChatContext";
import { STUDENT_ACCESS_LEVEL } from "../../lib/accessLevels";
import XChat from "../../components/application/Hub/Hub";
import RedirectNewToHub from "../../components/auth/RedirectNewToHub";
import {
    HEADER_HEIGHT_IN_REM,
    HTML_FONT_SIZE_IN_PX,
} from "../../lib/measurements";
import { useHeader } from "../../context/HeaderContext";
import MainHeader from "../../components/application/Header/MainHeader";

const PrivateWrapperStyle = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    height: 100%;
`;

const ApplicationInternalStyle = styled.div`
    height: 100vh;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;

    flex: 1 1 auto;
    display: flex;
    flex-direction: column;

    /* padding-top: ${HEADER_HEIGHT_IN_REM}rem; */
`;

const FillerDiv = styled.div`
    height: ${HEADER_HEIGHT_IN_REM}rem;
    flex-shrink: 0;
`;

function PrivateWrapper() {
    const { event } = useAuth();
    const navigate = useNavigate();

    const { handleScroll, showMainHeader, setShowHeader, setHovering } =
        useHeader();

    React.useEffect(() => {
        if (event === "PASSWORD_RECOVERY") {
            navigate("/reset-password");
        }
    }, [event]);

    React.useEffect(() => {
        const onMouseMove = e => {
            if (e.clientY <= HEADER_HEIGHT_IN_REM * HTML_FONT_SIZE_IN_PX) {
                setShowHeader(true);
                setHovering(true);
            } else {
                setHovering(false);
            }
        };

        window.onmousemove = onMouseMove;

        return () => {
            window.onmousemove = null;
        };
    }, []);

    return (
        <RequireUser>
            <RouteProtector
                accessLevel={STUDENT_ACCESS_LEVEL}
                redirect={"/activate"}>
                <RedirectNewToHub>
                    {showMainHeader && <MainHeader />}
                    <SocketContextProvider>
                        <PrivateWrapperStyle>
                            <ChatContextProvider>
                                <ApplicationInternalStyle
                                    onScroll={handleScroll}>
                                    <FillerDiv />
                                    <Outlet />
                                </ApplicationInternalStyle>
                                <XChat />
                            </ChatContextProvider>
                        </PrivateWrapperStyle>
                    </SocketContextProvider>
                </RedirectNewToHub>
            </RouteProtector>
        </RequireUser>
    );
}

export default PrivateWrapper;
