import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import CenteredColumn from "../styles/containers/CenteredColumn";

function Notification({ heading, caption }) {
    return (
        <Wrapper gap="2em" fullscreen>
            <Avatar size={150} hasLogo />
            <NotificationWrapper gap="2em">
                <h1>{heading}</h1>
                <h3>{caption}</h3>
            </NotificationWrapper>
        </Wrapper>
    );
}

const NotificationWrapper = styled(CenteredColumn)`
    background-color: rgb(0, 0, 0, 0.03);
    box-shadow: ${props => props.theme.colours.glow}40 0px 8px 36px;
    padding: 1.5em 8em;
`;

const Wrapper = styled(CenteredColumn)`
    display: flex;

    margin-bottom: 3em;
    b {
        color: ${props => props.theme.colours.secondary};
    }

    h1 {
        padding: 0 2em;
        color: ${props => props.theme.colours.primary};
        font-weight: 600;
        border-radius: 15px;
        font-size: ${props => props.theme.font.xlarge};
        margin-bottom: 0;
    }

    h3 {
        font-weight: 400;
        margin-top: 0;
    }
`;
export default Notification;
