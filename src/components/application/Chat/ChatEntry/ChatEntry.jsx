import React from "react";
import styled from "styled-components";
import GradientOutline from "./GradientOutline";
import Icon, { ICON_SIZE } from "./Icon";

const ChatEntry = ({ type, message }) => {
    const highlighted = type == "assistant" || type == "system";

    // console.log(type);
    return (
        <GradientOutline contrast hidden={type !== "system"}>
            <Container highlighted={highlighted}>
                <Icon highlighted={highlighted} type={type} />
                <span> {message} </span>
            </Container>
        </GradientOutline>
    );
};

const Container = styled.div`
    display: flex;
    font-size: 1.3rem;
    padding: 1rem;
    color: ${props =>
        props.highlighted
            ? props.theme.colours.primary
            : props.theme.colours.primaryStrong};
    padding-right: 1rem;
    span {
        white-space: pre-line;

        max-width: calc(100% - ${ICON_SIZE});
        overflow-wrap: break-word;
    }
    ${props =>
        props.highlighted && "background-color: rgb(255, 255, 255, 0.04);"}
`;

export default ChatEntry;
