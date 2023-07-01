import { redirect, Link, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { useAuth } from "../../context/SessionContext";
import styled from "styled-components";
import { useHeader } from "../../context/HeaderContext";
import Logo from "../../styles/Logo";

const LogoSvg = styled(Logo)`
    cursor: pointer;
    width: 175px;
    height: 6.25rem;
    /* border: 0.25rem solid black; */
`;

// const LogoSvgAlt = styled(Logo)`
//     position: fixed;
//     top: 0.6rem;
//     left: 3.125rem;

//     cursor: pointer;
//     width: 175px;
//     height: 6.25rem;

//     z-index: 10000;

//     /* border: 0.25rem solid black; */
// `;

const inClassroomRegex = /^\/lessons\/([^\/\?]+)\?id=([^\/\?]+)$/;

export default function Header() {
    const { session, setLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // if (location.pathname === "/reset-password") {
    //     return <></>;
    // }

    return (
        <Container>
            {location.pathname !== "/hub" && (
                <LogoSvg
                    onClick={() => {
                        navigate("/hub");
                    }}
                />
            )}

            {/* <LogoSvgAlt /> */}
        </Container>
    );
}

const ExitLessonButtonContainer = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    z-index: 100;
`;

const Container = styled.div`
    /* height: 15vh; */
    position: relative;
    width: 100%;
    color: white;
    z-index: 100;
    /* border: 2px solid red; */
    padding: 0px 3.125rem;
    min-height: 7.5rem;
    height: 7.5rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;
