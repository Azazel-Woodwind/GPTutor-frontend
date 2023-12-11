import React from "react";
import styled from "styled-components";
import Textfield from "@/components/common/input/Textfield";
import useConversationDisplay from "../../../hooks/useConversationDisplay";
import { useLoaderData } from "react-router-dom";
import { ChatContext } from "@/context/ChatContext";
import LessonCard from "./components/LessonCard";

function Lessons() {
    const lessons = useLoaderData();
    // console.log(lessons);

    // useConversationDisplay(0.3);
    const { width } = React.useContext(ChatContext);
    // console.log(width.get());

    const [filteredLessons, setFilteredLessons] = React.useState(lessons);

    return (
        <Container>
            <Controls>
                <SearchBar>
                    <Textfield
                        label="Advanced Search"
                        type="text"
                        fullwidth
                        required
                        onChange={e => {
                            const query = e.target.value;
                            const filtered = lessons.filter(lesson =>
                                lesson.title.toLowerCase().includes(query)
                            );
                            setFilteredLessons(filtered);
                        }}
                    />
                </SearchBar>
                <span>
                    Example: Search for "GCSE algebra linear equations"{" "}
                </span>
            </Controls>
            <LessonContainer>
                {filteredLessons.length ? (
                    filteredLessons.map(lesson => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                    ))
                ) : (
                    <h1>No lessons</h1>
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
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    z-index: 5;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 5;
    overflow-x: clip;
`;
const LessonContainer = styled.div`
    margin-left: 4rem;
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 70%;
    height: fit-content;
    margin-bottom: 2rem;
    align-content: space-evenly;
    /* border: 2px solid red; */
`;

export default Lessons;
