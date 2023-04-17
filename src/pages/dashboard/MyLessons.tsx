import React from "react";
import { useLoaderData } from "react-router-dom";
import LessonAPI from "../../api/LessonAPI";
import styled from "styled-components";
import { formatEducationLevel, formatSubject } from "../../lib/stringUtils";
import { EditAlt } from "@styled-icons/boxicons-regular";
import { Delete } from "@styled-icons/fluentui-system-regular";
import { useNavigate } from "react-router-dom";
import { PublishedWithChanges } from "@styled-icons/material/PublishedWithChanges";

const EditIcon = styled(EditAlt)`
    width: 24px;
    color: ${props => props.theme.colours.secondary};
    position: absolute;
    right: 2em;
    cursor: pointer;
`;
const DeleteIcon = styled(Delete)`
    width: 24px;
    color: ${props => props.theme.colours.secondary};
    position: absolute;
    right: 0.5em;
    cursor: pointer;
`;

function MyLessons() {
    const lessons = useLoaderData();
    const navigate = useNavigate();
    console.log(lessons);
    return (
        <Container>
            <h1> My Lessons</h1>
            <Table>
                {[...lessons, ...lessons, ...lessons].map(lesson => {
                    const time = new Date(lesson.created_at);

                    return (
                        <Row>
                            <span> {lesson.title} </span>
                            <span> {formatSubject(lesson.subject)} </span>
                            <span>
                                {formatEducationLevel(lesson.education_level)}
                            </span>
                            <span>{time.toLocaleDateString()}</span>
                            <span>
                                {lesson.is_published ? "Published" : "Draft"}
                            </span>
                            <span>
                                {lesson.is_verified ? "Verified" : "Unverified"}
                            </span>
                            <DeleteIcon />
                            <EditIcon
                                onClick={() =>
                                    navigate(`/edit-lesson?id=${lesson.id}`)
                                }
                            />
                        </Row>
                    );
                })}
            </Table>
        </Container>
    );
}

const Container = styled.div``;

const Row = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
    background-color: rgb(255, 255, 255, 0.05);
    padding: 0.5em 1em;
    position: relative;
    span {
        width: 8em;
    }
`;
const Table = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;
export default MyLessons;
