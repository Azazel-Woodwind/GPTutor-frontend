import React from "react";
import HeaderContainer from "../../../components/Header/HeaderContainer";
import { LogoSvg } from "../../../components/Header/MainHeader";
import ExitButton from "../../../components/input/ExitButton";
import styled from "styled-components";

function QuizHeader({ lesson, answerIsCorrect, currentQuestion, setExit }) {
    return (
        <HeaderContainer>
            <LogoSvg />
            <Title>{lesson.title}</Title>
            <ExitButton
                outline={!(answerIsCorrect && currentQuestion?.final)}
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
