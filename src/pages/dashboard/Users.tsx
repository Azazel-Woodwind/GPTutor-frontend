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

function Users() {
    const users = useLoaderData();
    const navigate = useNavigate();
    const submit = useSubmit();
    return (
        <Container>
            <h1>Users</h1>
            <Table>
                <Row headings>
                    <span>First Name</span>
                    <span>Last Name</span>
                    <span>Email</span>
                    <span>Education Level</span>
                    <span>Created On</span>
                </Row>
                {users.map(user => {
                    const time = new Date(user.created_at);

                    return (
                        <Row>
                            <span> {user.user_metadata.first_name} </span>
                            <span> {user.user_metadata.last_name} </span>
                            <span>{user.email}</span>
                            <span>{user.user_metadata.education_level}</span>
                            <span>{time.toLocaleDateString()}</span>
                            <IconsContainer>
                                <DeleteIcon />
                                <EditIcon />
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

const Container = styled.div``;

export default Users;
