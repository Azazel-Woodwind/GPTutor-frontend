import React from "react";
import styled from "styled-components";
import Message from "./Message";

const ChatHistoryStyle = styled.div`
    flex-grow: 1;
    width: 100%;
    padding: 1em 1em;
    overflow-x: clip;
    padding-bottom: 0;
    padding-bottom: 1em;
    box-shadow: #3523a940 0px 0px 900px;
    background-color: rgb(0, 0, 0, 0.1);
`;

const DirectionReverse = styled.div`
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    width: 100%;
    flex-grow: 1;
    height: ${props => props.height && props.height};
`;

function ChatHistory({ height, prompt, hook: { history, currentMessage } }) {
    return (
        <DirectionReverse height={height}>
            <ChatHistoryStyle>
                <Message type={"system"} message={prompt} />
                {history.map((chat, i) => {
                    return (
                        <Message
                            key={i}
                            type={chat.role}
                            message={chat.content}
                        />
                    );
                })}
                {currentMessage && (
                    <Message type={"assistant"} message={currentMessage} />
                )}
            </ChatHistoryStyle>
        </DirectionReverse>
    );
}

export default ChatHistory;
