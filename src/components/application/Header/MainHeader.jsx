import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation/Navigation";
import HeaderContainer from "@/components/application/Header/HeaderContainer";
import LogoSvg from "./LogoSvg";

export default function MainHeader() {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <LogoSvg
                onClick={() => {
                    navigate("/hub");
                }}
            />
            <Navigation />
            <Filler />
        </HeaderContainer>
    );
}

const Filler = styled.div`
    width: 175px;
`;
