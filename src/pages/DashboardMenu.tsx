import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/SessionContext";
import useConversationDisplay from "../hooks/useConversationDisplay";
import FillParent from "../styles/containers/FillParent";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ACCESS_LEVEL } from "../lib/accessLevels";
import Icon from "../styles/NavIcon";
import NavElement from "../components/NavElement";
import { UserBadge } from "@styled-icons/boxicons-solid/UserBadge";
import { AlternateGlobalStyle } from "../styles/GlobalStyles";

const Users = Icon(UserBadge);

const Dashboard = () => {
    useConversationDisplay(0.25);
    const { session } = useAuth();

    return (
        <Container>
            <AlternateGlobalStyle />
            <UsedSpace>
                <DashboardNav>
                    <NavElement Icon={Users} subPath="my-lessons">
                        My Lessons
                    </NavElement>
                    {session?.user?.accessLevel >= ADMIN_ACCESS_LEVEL && (
                        <>
                            <NavElement Icon={Users} subPath="users">
                                Users
                            </NavElement>
                            <NavElement Icon={Users} subPath="lessons">
                                Lessons
                            </NavElement>
                        </>
                    )}
                </DashboardNav>
                <Page>
                    <Outlet />
                </Page>
            </UsedSpace>
        </Container>
    );
};

const Container = styled(FillParent)`
    padding-top: 8em;
    padding-left: 3em;
    /* border: 3px solid green; */
`;

const UsedSpace = styled.div`
    max-width: 1080px;
    width: 100%;
    display: flex;
    gap: 4em;
`;
const Page = styled.div`
    flex-grow: 1;
    p {
        max-width: 80ch;
    }
    h1 {
        margin-top: 0;
    }
`;

const DashboardNav = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
`;
export default Dashboard;
