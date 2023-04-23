import React, { useEffect } from "react";
import LessonCard from "../components/LessonCard";
import styled from "styled-components";
import { Textfield } from "../components/Textfield";
import { FaEye } from "react-icons/fa";
import Button from "../components/Button";
import useConversationDisplay from "../hooks/useConversationDisplay";
import { useLoaderData } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

function Lessons() {
    const lessons = useLoaderData();

    useConversationDisplay(0.3);
    const { width } = React.useContext(ChatContext);
    // console.log(width.get());

    return (
        <Container>
            <Controls>
                <SearchBar>
                    <Textfield
                        label="Advanced Search"
                        type="text"
                        fullwidth
                        required
                    />
                </SearchBar>
                <span>
                    Example: Search for "GCSE algebra linear equations"{" "}
                </span>
            </Controls>
            <LessonContainer>
                {lessons.length ? (
                    lessons.map(lesson => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                    ))
                ) : (
                    <h1>No lessons found :(</h1>
                )}
            </LessonContainer>
        </Container>
    );
}

const SearchBar = styled.div`
    width: 40vw;
`;
const Controls = styled.div`
    width: 100%;
    margin: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5em;
    z-index: 5;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 5;
    overflow-x: clip;
    padding-top: 6em;
`;
const LessonContainer = styled.div`
    margin-left: 4em;
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    width: 70%;
    height: fit-content;
    margin-bottom: 2em;
`;

export default Lessons;
