import React from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { EditAlt } from "@styled-icons/boxicons-regular";
import { Delete } from "@styled-icons/fluentui-system-regular";
import Table from "../../components/Table";
import Row from "../../components/Row";
import IconsContainer from "../../components/IconsContainer";
import IconStyles from "../../components/IconStyles";

function Page() {
    const users = useLoaderData();
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

const Container = styled.div``;

export default Page;
