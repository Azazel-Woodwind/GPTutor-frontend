import React from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import LessonAPI from "../../api/LessonAPI";
import styled, { css } from "styled-components";
import { formatEducationLevel, formatSubject } from "../../lib/stringUtils";
import { EditAlt } from "@styled-icons/boxicons-regular";
import { Delete } from "@styled-icons/fluentui-system-regular";
import { useNavigate } from "react-router-dom";
import { PublishedWithChanges } from "@styled-icons/material/PublishedWithChanges";
import { Play } from "@styled-icons/fluentui-system-regular/Play";
import Table from "../../styles/Dashboard/Table";
import Row from "../../styles/Dashboard/Row";
import IconsContainer from "../../styles/Dashboard/IconsContainer";
import IconStyles from "../../styles/Dashboard/IconStyles";

function MyLessons() {
    const lessons = useLoaderData();
    const navigate = useNavigate();
    const submit = useSubmit();
    console.log(lessons);
    return (
        <Container>
            <h1> My Lessons</h1>
            <Table>
                <Row headings>
                    <span>Title</span>
                    <span>Subject</span>
                    <span>Education Level</span>
                    <span>Created On</span>
                    <span>Visibility</span>
                    <span>Status</span>
                </Row>
                {lessons.map(lesson => {
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
                            <IconsContainer>
                                <DeleteIcon
                                    onClick={() => {
                                        submit(
                                            { id: lesson.id },
                                            {
                                                method: "delete",
                                                action: "/dashboard/my-lessons",
                                            }
                                        );
                                    }}
                                />
                                <EditIcon
                                    onClick={() =>
                                        navigate(`/edit-lesson?id=${lesson.id}`)
                                    }
                                />
                                <PlayIcon
                                    onClick={() =>
                                        navigate(
                                            `/lessons/${lesson.title.replaceAll(
                                                " ",
                                                "-"
                                            )}?id=${lesson.id}`
                                        )
                                    }
                                />
                            </IconsContainer>
                        </Row>
                    );
                })}
            </Table>
        </Container>
    );
}

const EditIcon = styled(EditAlt)`
    ${IconStyles}
`;
const DeleteIcon = styled(Delete)`
    ${IconStyles}
`;
const PlayIcon = styled(Play)`
    ${IconStyles}
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export default MyLessons;
