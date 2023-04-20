import React from "react";
import styled from "styled-components";
import Message from "./Message";
import GradientOutline from "../styles/GradientOutline";
import { ChatContext } from "../context/ChatContext";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import useChat from "../hooks/useChat";
import useXConversation from "../hooks/useX/useXConversation";
import CenteredRow from "../styles/containers/CenteredRow";
import CenteredColumn from "../styles/containers/CenteredColumn";
import useAvatar from "../hooks/useAvatar";
import Resizable from "./Resizable";

const prompts = [
    "Hi X. Can you show me the available lessons?",
    "Help me get started with GCSE math?",
    "How does this page work?",
    "What subjects can you teach?",
    "Explain basic algebra",
];

const Chat = props => {
    const { width } = React.useContext(ChatContext);
    const location = useLocation();
    const hook = useXConversation();
    const chat = useChat({ hook });

    return (
        <Resizable number={width} min={400}>
            <Window>
                <ChatSection {...chat} />
            </Window>
        </Resizable>
    );
};

const ChatSection = ({ Avatar, AvatarProps, ChatHistory, Controls }) => {
    return (
        <>
            <Navigation />
            <Avatar size={120} {...AvatarProps} />
            <BottomSection>
                <ChatHistory
                    height="20em"
                    prompt={
                        "This is X, your personal AI tutor. You can have him navigate the application for you, or for example answer any questions related to the application or your subjects"
                    }
                />
                <Controls prompts={prompts} />
            </BottomSection>
        </>
    );
};
const BottomSection = styled(CenteredColumn)`
    max-width: 1200px;
    width: 100%;
    flex-grow: 1;
    margin-top: 2em;
`;

const Window = styled.div`
    display: flex;
    width: 100%;
    background-color: ${props => props.theme.colours.tertiary}90;
    box-shadow: #3523a940 0px 8px 30px;
    ${props => props.width === true && "width: 100vw;"}
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    position: relative;
    z-index: 2;
    height: 100vh;
    overflow: auto;
`;

export default Chat;
