import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { motion } from "framer-motion";
import {
    capitaliseFirstLetter,
    formatEducationLevel,
} from "../lib/stringUtils";
import { useNavigate } from "react-router-dom";

type PropsTypes = {
    lesson: Lesson;
};

function LessonCard({ lesson }: PropsTypes) {
    const navigate = useNavigate();

    return (
        <Container
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
                navigate(
                    `/lessons/${lesson.title.replaceAll(" ", "-")}?id=${
                        lesson.id
                    }`
                )
            }>
            <Title>{capitaliseFirstLetter(lesson.title)}</Title>
            <Subject>{capitaliseFirstLetter(lesson.subject)}</Subject>
            <Description>{lesson.caption}</Description>
            <Level>{formatEducationLevel(lesson.education_level)}</Level>
        </Container>
    );
}

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
    position: absolute;
    bottom: 1em;
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
    height: 18em;
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
`;

export default LessonCard;
