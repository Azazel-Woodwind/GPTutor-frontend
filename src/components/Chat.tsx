import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import Message from "./Message";
import GradientOutline from "../styles/GradientOutline";
import { MdBackspace, MdSend, MdKeyboardVoice } from "react-icons/md";
import { BaseInputStyle } from "./Textfield";
import { motion } from "framer-motion";
import IconWrapperStyle from "../styles/IconWrapper";
import { ChatContext } from "../context/ChatContext"; //retard?
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import useChat from "../hooks/useChat";
import useXConversation from "../hooks/useX/useXConversation";
import useResizable from "../hooks/useResizable";
import CenteredRow from "../styles/containers/CenteredRow";

const prompts = [
    "Hi X. Can you show me lessons?",
    "Help me get started with GCSE math?",
    "How does this page work?",
    "What subjects can you teach?",
    "Explain basic algebra",
];

const Chat = props => {
    const { width, max } = React.useContext(ChatContext);

    // console.log(width.get(), window.innerWidth);

    const { Resizable, isCollapsed } = useResizable({
        number: width,
        max,
        min: 320,
        draggable: width !== window.innerWidth,
    });
    const hook = useXConversation();
    const { Controls, ChatHistory, X } = useChat({ prompts: prompts, hook });

    return (
        <Resizable>
            <Window>
                {!isCollapsed && (
                    <>
                        <Navigation />
                        <AvatarContainer>
                            <X />
                        </AvatarContainer>
                        <BottomSection>
                            <ChatHistory
                                height="24em"
                                prompt={
                                    "This is X, your personal AI tutor. You can have him navigate the application for you, or for example answer any questions related to the application or your subjects"
                                }
                            />
                            <Controls />
                        </BottomSection>
                    </>
                )}
            </Window>
        </Resizable>
    );
};

const Container = styled.div``;

const AvatarContainer = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BottomSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
