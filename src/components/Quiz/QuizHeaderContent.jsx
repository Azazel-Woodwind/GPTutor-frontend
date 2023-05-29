import React from "react";
import HeaderContent from "../Header/HeaderContent";
import ExitButton from "../Header/ExitButton";
import styled from "styled-components";

function QuizHeaderContent({
    lesson,
    answerIsCorrect,
    currentQuestion,
    setExit,
}) {
    return (
        <HeaderContent
            centerContent={<Title>{lesson.title}</Title>}
            rightContent={
                <ExitButton
                    outline={!(answerIsCorrect && currentQuestion?.final)}
                    onClick={() => {
                        setExit(true);
                    }}
                />
            }
        />
    );
}

const Title = styled.div`
    font-size: 1.8em;
    font-weight: 400;
`;

export default QuizHeaderContent;
