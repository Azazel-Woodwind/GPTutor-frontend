import HeaderContainer from "@/components/application/Header/HeaderContainer";
import { LogoSvg } from "@/components/application/Header/MainHeader";
import ExitButton from "@/components/common/input/ExitButton";
import React from "react";
import styled from "styled-components";

function QuizHeader({ lesson, currentQuestion, setExit }) {
    return (
        <HeaderContainer>
            <LogoSvg />
            <Title>{lesson.title}</Title>
            <ExitButton
                outline={!(currentQuestion?.finished && currentQuestion?.final)}
                onClick={() => {
                    setExit(true);
                }}
            />
        </HeaderContainer>
    );
}

const Title = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.8rem;
    font-weight: 400;
`;

export default QuizHeader;
