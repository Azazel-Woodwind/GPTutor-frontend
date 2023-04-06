import React, { useEffect } from "react";
import LessonCard from "../components/LessonCard";
import styled from "styled-components";
import { Textfield } from "../components/Textfield";
import { FaEye } from "react-icons/fa";
import Button from "../components/Button.tsx";

function Lessons() {
    return (
        <Container>
            <Controls>
                <SearchBar>
                    <Textfield label="Advanced Search" type="text" required />
                </SearchBar>
                <span>
                    {" "}
                    Example: Search for "GCSE algebra linear equations"{" "}
                </span>
            </Controls>
            <LessonContainer>
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
                <LessonCard />
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
    //background-color: #121a3f;
    z-index: 5;
`;
const LessonContainer = styled.div`
    margin-left: 4em;
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    width: 70em;
    height: 70vh;
    margin-bottom: 2em;
    overflow-y: scroll;
`;
export default Lessons;
