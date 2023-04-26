import React from "react";
import styled from "styled-components";
import { NavigateHome } from "../../components/Navigation";
import CustomButton from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";

const Header = ({
    learningObjectiveNumber,
    currentLesson,
    currentLearningObjective,
}) => {
    return (
        <Container>
            <ExitButton>
                <NavigateHome />
            </ExitButton>
            <Title>
                {learningObjectiveNumber > 0 && (
                    <ProgressBar
                        width="35em"
                        value={learningObjectiveNumber}
                        max={currentLesson.learning_objectives.length}
                    />
                )}
                {currentLearningObjective?.title &&
                    currentLearningObjective.title + " 🗿"}
            </Title>
        </Container>
    );
};

const Title = styled.h3`
    margin: auto;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 400;
`;
const Container = styled.div`
    position: absolute;
    top: 0px;
    padding: 1.5em;
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
`;

const ExitButton = styled.div`
    position: absolute;
    top: 1em;
    right: 1em;
`;

export default Header;
