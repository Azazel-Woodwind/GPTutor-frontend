import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { motion } from "framer-motion";
import {
    capitaliseFirstLetter,
    formatEducationLevel,
} from "../lib/stringUtils";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";

function LessonCard({ lesson }) {
    const navigate = useNavigate();

    return (
        <Container
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
                console.log("HERE");
                navigate(
                    `/lessons/${lesson.title.replaceAll(" ", "-")}?id=${
                        lesson.id
                    }`
                );
            }}>
            <Title>{capitaliseFirstLetter(lesson.title)}</Title>
            <Subject>{lesson.exam_board || "Edexcel"}</Subject>
            <Description>{lesson.caption}</Description>
            <Footer>
                <FooterRow>
                    <Level>
                        {formatEducationLevel(lesson.education_level)}
                    </Level>
                    <ExamBoard>
                        {capitaliseFirstLetter(lesson.subject)}
                    </ExamBoard>
                </FooterRow>
                <CustomButton
                    style={{ width: "100%" }}
                    outline
                    onClick={e => {
                        e.stopPropagation();
                        navigate(
                            `/quiz/${lesson.title.replaceAll(" ", "-")}?id=${
                                lesson.id
                            }`
                        );
                    }}>
                    Quiz
                </CustomButton>
            </Footer>
        </Container>
    );
}

const FooterRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 7px;
`;

const Footer = styled.div`
    width: 100%;
    /* border: 1px solid red; */

    position: absolute;
    left: 0;
    bottom: 1em;

    padding: 0 20px;

    h3 {
        font-size: 18px;
    }
`;

const ExamBoard = styled.h3`
    margin: 0;
    font-size: 16px;
    z-index: 4;
`;

const Title = styled.h1`
    margin: 0;
    color: ${props => props.theme.colours.primary};
    font-size: 20px;
    font-weight: 400;
    z-index: 4;
`;

const Description = styled.p`
    color: ${props => props.theme.colours.primaryFaded};
`;
const Subject = styled.h3`
    font-weight: 400;
    font-size: 16px;
    color: ${props => props.theme.colours.primaryFaded};
    z-index: 4;
`;

const Level = styled.h3`
    margin: 0;
    font-size: 16px;
    z-index: 4;
`;
const AvatarContainer = styled.div`
    position: absolute;
    right: 3em;
    bottom: 3em;
`;

const Container = styled.div`
    position: relative;
    padding: 2em 1em;
    width: 15em;
    height: 20em;
    z-index: 10;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: ${props => props.theme.colours.tertiary}30;
    :hover {
        background-color: ${props => props.theme.colours.tertiary}40;
    }
    box-shadow: ${props => props.theme.colours.glow}20 0px 2px 8px 0px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    border-bottom-right-radius: 0px;
    cursor: pointer;
    z-index: 2;
    gap: 10px;

    /* border: 5px solid green; */
`;

export default LessonCard;
