import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import Message from "../components/Message";
import { MdBackspace, MdSend, MdKeyboardVoice } from "react-icons/md";
import { BaseInputStyle } from "../components/Textfield";
import { motion } from "framer-motion";
import IconWrapperStyle from "../styles/IconWrapper";
import { ChatContext } from "../context/ChatContext";
import { useLocation } from "react-router-dom";
import CustomButton from "../components/Button";

const useChat = ({ prompts, hook }) => {
    const [placeholder] = React.useState(
        prompts[Math.floor(Math.random() * prompts.length)] + " ⏎"
    );

    const location = useLocation();
    const messageInput = React.useRef(undefined);

    const {
        sendMessage,
        history,
        setHistory,
        loading,
        setLoading,
        currentMessage,
        setCurrentMessage,
        streaming,
        speaking,
    } = hook;

    const onSubmit = e => {
        e.preventDefault();
        const message = messageInput.current.value;
        messageInput.current.value = "";

        if (message.replaceAll(" ", "") == "") return;
        sendMessage(message, { path: location.pathname });
    };

    return {
        Controls: () => (
            <Controls>
                <IconWrapperStyle>
                    <MdKeyboardVoice />
                </IconWrapperStyle>
                <form onSubmit={onSubmit}>
                    <ChatInput ref={messageInput} placeholder={placeholder} />
                </form>
            </Controls>
        ),
        X: ({ size }) => (
            <AvatarContainer>
                <Avatar size={size ? size : 100} />
            </AvatarContainer>
        ),
        ChatHistory: ({ height, prompt }) => (
            <DirectionReverse height={height}>
                <ChatHistory>
                    <Message type={"system"} message={prompt} />
                    {history.map(chat => {
                        return (
                            <Message type={chat.role} message={chat.content} />
                        );
                    })}
                    {currentMessage && (
                        <Message type={"assistant"} message={currentMessage} />
                    )}
                </ChatHistory>
            </DirectionReverse>
        ),
    };
};

const DirectionReverse = styled.div`
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    height: ${props => props.height && props.height};
`;

const ChatInput = styled(BaseInputStyle)`
    border-radius: 15px;
    border: 1px solid #f3f3f3;
    padding: 0.5em 2em;
`;

const ChatHistory = styled.div`
    flex-grow: 1;
    width: 100%;
    padding: 1em 1em;
    overflow-x: clip;
    padding-bottom: 0;
    max-width: 1080px;
    padding-bottom: 1em;
    box-shadow: #3523a940 0px 0px 900px;
    background-color: rgb(0, 0, 0, 0.1);
`;

const AvatarContainer = styled.div`
    position: relative;
`;

const Controls = styled.div`
    background-color: rgb(0, 0, 0, 0.2);
    width: 100%;
    padding: 1em 2em;
    box-sizing: border-box;
    display: flex;
    gap: 0.5em;
    justify-content: center;
    max-width: 720px;
    form {
        flex: 1 1 0;
    }
`;

export default useChat;
