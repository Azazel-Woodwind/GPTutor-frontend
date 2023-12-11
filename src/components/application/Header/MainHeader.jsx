import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Logo from "../../common/graphics/Logo";
import Navigation from "./Navigation";
import HeaderContainer from "@/components/application/Header/HeaderContainer";
import { useAuth } from "@/context/SessionContext";

export const LogoSvg = styled(Logo)`
    cursor: pointer;
    width: 175px;
    height: 6.25rem;
`;

const inClassroomRegex = /^\/lessons\/([^\/\?]+)\?id=([^\/\?]+)$/;
const inQuizRegex = /^\/quiz\/([^\/\?]+)\?id=([^\/\?]+)$/;

export default function MainHeader() {
    const { session, setLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // if (location.pathname === "/reset-password") {
    //     return <></>;
    // }

    return (
        <HeaderContainer>
            <LogoSvg
                onClick={() => {
                    navigate("/hub");
                }}
            />
            <Navigation />
            <Filler />

            {/* <LogoSvgAlt /> */}
        </HeaderContainer>
    );
}

const Filler = styled.div`
    width: 175px;
`;
