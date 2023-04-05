import React from "react";
import styled from "styled-components";
import Avatar from "../styles/Avatar";

const Chat = props => {
    return (
        <Window>
            <AvatarContainer>
                <Avatar size={100} />
            </AvatarContainer>
            <ChatHistory></ChatHistory>
            <Controls>Controls</Controls>
        </Window>
    );
};

const ChatHistory = styled.div`
    flex-grow: 1;
    width: 100%;
    border: 1px solid #f3f3f3;
    display: flex;
    flex-direction: column-reverse;
`;
const AvatarContainer = styled.div`
    position: relative;
    z-index: 100;
`;
const Controls = styled.div`
    background-color: rgb(0, 0, 0, 0.8);
    width: 100%;
    padding: 1em 2em;
    box-sizing: border-box;
`;
const Window = styled.div`
    background-color: #152b5a;
    width: 80em;
    height: 100vh;
    display: flex;
`;

export default Chat;
