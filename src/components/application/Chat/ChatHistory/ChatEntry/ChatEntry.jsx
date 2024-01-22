import React from "react";
import styled from "styled-components";
import GradientOutline from "./GradientOutline";
import Icon, { ICON_SIZE } from "./Icon";

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

/**
 * ChatEntry - A component for displaying a single entry in a chat interface.
 * It differentiates between messages from the assistant, system, and user.
 *
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of chat entry ('assistant', 'system', or other for user).
 * @param {string} props.message - The message content to be displayed.
 * @returns {React.Component} A chat entry component with an optional gradient outline for system messages.
 */
function ChatEntry({ type, message }) {
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
}

export default ChatEntry;
