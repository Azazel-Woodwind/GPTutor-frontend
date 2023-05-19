import React from "react";
import styled from "styled-components";
import { NavigateHome } from "../Navigation";
import CustomButton from "../Button";
import ProgressBar from "../ProgressBar";
import { Exit } from "@styled-icons/boxicons-regular/Exit";
import { TextWrapper } from "../../styles/TextWrappers";
import SvgIcon from "../SvgIcon";
import { ExitSvgData } from "../../lib/svgIconData";

const Header = ({
    learningObjectiveNumber,
    currentLesson,
    finished,
    onExit,
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
                    </>
                ) : (
                    <>{currentLesson?.title && currentLesson.title}</>
                )}
            </Title>
            <ExitButton>
                <CustomButton outline={!finished} onClick={onExit}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.2em",
                        }}>
                        <TextWrapper
                            mainGradient={!finished}
                            fontWeight={600}
                            fontSize="20px">
                            Exit Lesson
                        </TextWrapper>
                        <SvgIcon
                            svgData={ExitSvgData}
                            fill={finished ? "white" : "gradient"}
                            size="2em"
                        />
                    </div>
                </CustomButton>
            </ExitButton>
        </>
    );
};

const Title = styled.div`
    position: absolute;
    left: 50%;
    top: 30px;
    transform: translateX(-50%);

    font-size: 1.8em;
    font-weight: 400;

    ${props =>
        props.progressBarShown &&
        `
    top: 40px;
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
    top: 1.6em;
    right: 4em;
    z-index: 1000;
`;

export default Header;
