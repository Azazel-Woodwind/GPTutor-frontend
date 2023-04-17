import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/SessionContext";
import GradientOutline from "../styles/GradientOutline";

const AvatarStyle = styled.div`
    width: 1ch;
    height: 1ch;
    padding: 1ch;
    background-color: ${props => props.theme.colours.secondary};
    ${props =>
        props.type == "system" && props.theme.gradient({ animationLength: 5 })}
    ${props =>
        !props.highlighted &&
        `background-color: rgb(0, 0, 0, 0.7); color: unset;`};

    margin-right: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
    box-sizing: unset;
    font-style: italic;
`;

const Avatar = ({ type, highlighted }) => {
    var symbol;
    const { session } = useAuth();

    switch (type) {
        case "assistant":
            symbol = "X";
            break;
        case "user":
            symbol = session.user.user_metadata.first_name
                .charAt(0)
                .toUpperCase();
            break;
        case "system":
            symbol = "S";
            break;
    }

    return (
        <AvatarStyle highlighted={highlighted} type={type}>
            {" "}
            {symbol}{" "}
        </AvatarStyle>
    );
};
const Message = ({ type, message }) => {
    const highlighted = type == "assistant" || type == "system";

    console.log(type);
    return (
        <GradientOutline hidden={type !== "system"}>
            <Container highlighted={highlighted}>
                <Avatar highlighted={highlighted} type={type} />
                <span> {message} </span>
            </Container>
        </GradientOutline>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 1em;
    color: ${props =>
        props.highlighted
            ? props.theme.colours.primary
            : props.theme.colours.primaryStrong};
    padding-right: 1em;
    span {
        white-space: pre-line;
        flex-grow: 1;
    }
    ${props =>
        props.highlighted && "background-color: rgb(255, 255, 255, 0.03);"}
`;
export default Message;
