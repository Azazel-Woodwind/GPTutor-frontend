import React from "react";
import styled from "styled-components";
import { NavigateHome } from "../Navigation";
import CustomButton from "../Button";
import ProgressBar from "../ProgressBar";

const Header = ({
    learningObjectiveNumber,
    currentLesson,
    currentLearningObjective,
}) => {
    return (
        <>
            <Title progressBarShown={learningObjectiveNumber > 0}>
                {learningObjectiveNumber > 0 ? (
                    <>
                        <ProgressBar
                            width="40em"
                            value={learningObjectiveNumber}
                            max={currentLesson.learning_objectives.length}
                        />
                        {currentLearningObjective?.title &&
                            currentLearningObjective.title + " 🗿"}
                    </>
                ) : (
                    <>{currentLesson?.title && currentLesson.title}</>
                )}
            </Title>
            <ExitButton>
                <NavigateHome size={40} />
            </ExitButton>
        </>
    );
};

const Title = styled.div`
    position: absolute;
    left: 50%;
    top: 30px;
    transform: translateX(-50%);

    font-size: 1.5em;
    font-weight: 400;

    ${props =>
        props.progressBarShown &&
        `
        @media (max-width: 1600px) {
        font-size: 1.5em;
    }

    @media (max-width: 1400px) {
        font-size: 1em;
        top: 50px;
    }

    @media (max-width: 1100px) {
        font-size: 0.7em;
        top: 55px;
    }

    @media (max-width: 900px) {
        font-size: 0.5em;
    }
    `}
`;

const ExitButton = styled.div`
    position: absolute;
    top: 2em;
    right: 4em;
    z-index: 1000;
`;

export default Header;
