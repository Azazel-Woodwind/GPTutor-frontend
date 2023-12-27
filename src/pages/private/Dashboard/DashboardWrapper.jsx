import React from "react";
import styled from "styled-components";
import { useAuth } from "@/context/SessionContext";
import FillParent from "../../../components/common/layout/FillParent";
import { Outlet } from "react-router-dom";
import { ADMIN_ACCESS_LEVEL } from "@/lib/accessLevels";
import { UserBadge } from "@styled-icons/boxicons-solid/UserBadge";
import { AlternateGlobalStyle } from "../../../styles/GlobalStyles";
import MenuElement from "../../../components/application/NavigationMenu/MenuElement";
import MenuIcon from "../../../components/application/NavigationMenu/MenuIcon";
import RouteProtector from "@/components/auth/RouteProtector";

const Users = MenuIcon(UserBadge);

const Dashboard = () => {
    // useConversationDisplay(0.25);
    const { session } = useAuth();

    return (
        <RouteProtector accessLevel={ADMIN_ACCESS_LEVEL}>
            <Container>
                <AlternateGlobalStyle />
                <UsedSpace>
                    <DashboardNav>
                        <MenuElement Icon={Users} subPath="my-lessons">
                            My Lessons
                        </MenuElement>
                        {session?.user?.accessLevel >= ADMIN_ACCESS_LEVEL && (
                            <>
                                <MenuElement Icon={Users} subPath="users">
                                    Users
                                </MenuElement>
                                <MenuElement Icon={Users} subPath="lessons">
                                    Lessons
                                </MenuElement>
                            </>
                        )}
                    </DashboardNav>
                    <Page>
                        <Outlet />
                    </Page>
                </UsedSpace>
            </Container>
        </RouteProtector>
    );
};

const Container = styled(FillParent)`
    padding-left: 3rem;
    padding-top: 1rem;
    /* border: 3px solid green; */
`;

const UsedSpace = styled.div`
    max-width: 1080px;
    width: 100%;
    display: flex;
    gap: 4rem;
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
