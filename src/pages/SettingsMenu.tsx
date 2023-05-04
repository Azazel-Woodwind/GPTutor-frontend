import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/SessionContext";
import useConversationDisplay from "../hooks/useConversationDisplay";
import FillParent from "../styles/containers/FillParent";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import NavElement from "../components/NavElement";
import { Settings2Outline } from "@styled-icons/evaicons-outline";
import { NotificationsCircle } from "@styled-icons/ionicons-outline";
import { Profile } from "@styled-icons/remix-line";
import { AccountCircle } from "@styled-icons/material";
import { DarkTheme } from "@styled-icons/fluentui-system-filled";
import { Payment } from "@styled-icons/fluentui-system-filled";
import Icon from "../styles/NavIcon";
import { AlternateGlobalStyle } from "../styles/GlobalStyles";

const Settings = Icon(Settings2Outline);
const Plans = Icon(Payment);
const Appearance = Icon(DarkTheme);
const UserAccount = Icon(AccountCircle);
const Notifications = Icon(NotificationsCircle);
const UserProfile = Icon(Profile);

const Account = () => {
    useConversationDisplay(0.3);

    return (
        <Container>
            <AlternateGlobalStyle />
            <UsedSpace>
                <AccountNav>
                    <NavElement Icon={Settings} subPath="general">
                        General
                    </NavElement>
                    <NavElement Icon={UserAccount} subPath="account">
                        Account
                    </NavElement>
                    <NavElement Icon={Appearance} subPath="appearance">
                        Appearance
                    </NavElement>
                    <NavElement Icon={Notifications} subPath="notifications">
                        Notifications
                    </NavElement>
                    <NavElement Icon={UserProfile} subPath="profile">
                        Profile
                    </NavElement>
                    <NavElement Icon={Plans} subPath="plans">
                        Plans and Billing
                    </NavElement>
                    {/*<NavElement icon={<MdSettings />} subPath="profile">
                        Public Profile
                    </NavElement>
                    <NavElement icon={<MdSettings />} subPath="account">
                        Account
                    </NavElement>
                    <NavElement icon={<MdSettings />} subPath="appearance">
                        Appearance
                    </NavElement>
                    <NavElement icon={<MdSettings />} subPath="notifications">
                        Notifications
                    </NavElement>
                    <NavElement icon={<MdSettings />} subPath="plans">
                        Billing and Plans
    </NavElement>*/}
                </AccountNav>
                <Page>
                    <Outlet />
                </Page>
            </UsedSpace>
        </Container>
    );
};

const Container = styled(FillParent)`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: left;
    padding-left: 3em;
`;

const UsedSpace = styled.div`
    max-width: 1000px;
    width: 100%;
    display: flex;
    gap: 4em;
    padding-right: 50px;
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

const AccountNav = styled.div`
    display: flex;
    flex-direction: column;
`;
export default Account;
