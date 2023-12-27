import { SUPER_ADMIN_ACCESS_LEVEL } from "@/lib/accessLevels";
import RouteProtector from "@/components/auth/RouteProtector";
import React from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { EditAlt } from "@styled-icons/boxicons-regular";
import { Delete } from "@styled-icons/fluentui-system-regular";
import Table from "../../components/Table";
import Row from "../../components/Row";
import IconsContainer from "../../components/IconsContainer";
import IconStyles from "../../components/IconStyles";

const EditIcon = styled(EditAlt)`
    ${IconStyles}
`;
const DeleteIcon = styled(Delete)`
    ${IconStyles}
`;

const Container = styled.div``;

/**
 * A dashboard page that allows super administrators to view and manage users.
 *
 * @page
 * @route /dashboard/users
 * @accessLevel 4 - Super Administrator
 * @returns {JSX.Element} - Renders a table of users
 */
function Users() {
    const users = useLoaderData();

    return (
        <RouteProtector accessLevel={SUPER_ADMIN_ACCESS_LEVEL}>
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
                                <span>
                                    {user.user_metadata.education_level}
                                </span>
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
        </RouteProtector>
    );
}

export default Users;
