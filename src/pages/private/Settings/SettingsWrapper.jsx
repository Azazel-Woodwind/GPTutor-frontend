import React from "react";
import styled from "styled-components";
import FillParent from "@/components/common/layout/FillParent";
import { Outlet } from "react-router-dom";
import { Settings2Outline } from "@styled-icons/evaicons-outline";
import { NotificationsCircle } from "@styled-icons/ionicons-outline";
import { Profile } from "@styled-icons/remix-line";
import { AccountCircle } from "@styled-icons/material";
import { DarkTheme } from "@styled-icons/fluentui-system-filled";
import { Payment } from "@styled-icons/fluentui-system-filled";
import { AlternateGlobalStyle } from "@/styles/GlobalStyles";
import MenuElement from "@/components/application/NavigationMenu/MenuElement";
import MenuIcon from "@/components/application/NavigationMenu/MenuIcon";

const Settings = MenuIcon(Settings2Outline);
const Plans = MenuIcon(Payment);
const Appearance = MenuIcon(DarkTheme);
const UserAccount = MenuIcon(AccountCircle);
const Notifications = MenuIcon(NotificationsCircle);
const UserProfile = MenuIcon(Profile);

const SettingsWrapper = () => {
    // useConversationDisplay(0.3);

    return (
        <Container>
            <AlternateGlobalStyle />
            <UsedSpace>
                <AccountNav>
                    <MenuElement Icon={Settings} subPath="general">
                        General
                    </MenuElement>
                    <MenuElement Icon={UserAccount} subPath="account">
                        Account
                    </MenuElement>
                    <MenuElement Icon={UserProfile} subPath="profile">
                        Profile
                    </MenuElement>
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
    padding-left: 3rem;
    padding-top: 1rem;
`;

const UsedSpace = styled.div`
    max-width: 62.5rem;
    width: 100%;
    display: flex;
    gap: 4rem;
    padding-right: 3.125rem;
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

export default SettingsWrapper;
