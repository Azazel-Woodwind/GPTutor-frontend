import HeaderContainer from "@/components/application/Header/HeaderContainer";
import ExitButton from "@/components/application/Header/ExitButton";
import React from "react";
import styled from "styled-components";
import LogoSvg from "@/components/application/Header/LogoSvg";
import ProgressBar from "@/components/common/feedback/ProgressBar";

function ClassroomHeader({
    learningObjectiveNumber,
    currentLesson,
    finished,
    streaming,
    speaking,
    isMuted,
    setExit,
}) {
    return (
        <HeaderContainer>
            <LogoSvg />
            <Title progressBarShown={learningObjectiveNumber > 0}>
                {learningObjectiveNumber > 0 ? (
                    <div style={{ paddingTop: "1.25rem" }}>
                        <ProgressBar
                            width="35rem"
                            value={learningObjectiveNumber}
                            max={currentLesson.learning_objectives.length}
                        />
                    </div>
                ) : (
                    <>{currentLesson?.title && currentLesson.title}</>
                )}
            </Title>
            <ExitButton
                outline={!(finished && !streaming && (isMuted() || !speaking))}
                onClick={() => setExit(true)}
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

    ${props =>
        props.progressBarShown &&
        `
    top: 2.5rem;
    @media (max-width: 1600px) {
        font-size: 1.5rem;
    }

    @media (max-width: 1400px) {
        font-size: 1rem;
        top: 3.125rem;
    }

    @media (max-width: 1100px) {
        font-size: 0.7rem;
        top: 55px;
    }

    @media (max-width: 900px) {
        font-size: 0.5rem;
    }
    `}
`;

export default ClassroomHeader;
