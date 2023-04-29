import React from "react";
import styled from "styled-components";
import Message from "./Message";
import GradientOutline from "../styles/GradientOutline";
import { ChatContext } from "../context/ChatContext";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import useChat, { AnimatedAvatar } from "../hooks/useChat";
import useXConversation from "../hooks/useX/useXConversation";
import CenteredRow from "../styles/containers/CenteredRow";
import CenteredColumn from "../styles/containers/CenteredColumn";
import useAvatar from "../hooks/useAvatar";
import Resizable from "./Resizable";
import { fade_animation } from "../styles/FramerAnimations";
import ChatHistory from "./ChatHistory";
import Controls from "./Controls";
import { motion, useMotionValue } from "framer-motion";

const prompts = [
    "Hi X. Can you show me the available lessons?",
    "Help me get started with GCSE math?",
    "How does this page work?",
    "What subjects can you teach?",
    "Explain basic algebra",
];

const Chat = props => {
    const { width } = React.useContext(ChatContext);
    const hook = useXConversation();
    // const chat = useChat({ hook });

    return (
        <Resizable number={width} min={400}>
            <Window>
                <Navigation />
                <AvatarContainer>
                    <AnimatedAvatar size={120} {...hook} hasControls />
                </AvatarContainer>
                <ChatSection
                    hook={hook}
                    prompt="This is X, your personal AI tutor. You can have him navigate the application for you, or for example answer any questions related to the application or your subjects"
                    prompts={prompts}
                />
            </Window>
        </Resizable>
    );
};

export const ChatSection = ({ hook, prompt, prompts, ...props }) => {
    const containerHeight = useMotionValue("100vh");

    const callback = React.useCallback(ref => {
        if (ref) {
            containerHeight.set(ref.offsetHeight);
        }
    }, []);

    return (
        <BottomSection
            ref={callback}
            style={{ height: containerHeight }}
            {...props}>
            <ChatHistory
                containerHeight={containerHeight}
                prompt={prompt}
                hook={hook}
            />
            <Controls prompts={prompts} hook={hook} />
        </BottomSection>
    );
};

const AvatarContainer = styled.div`
    flex-grow: 1;
    margin: 10px;
`;

const BottomSection = styled(motion.div)`
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Window = styled.div`
    display: flex;
    width: 100%;
    background-color: ${props => props.theme.colours.tertiary};
    box-shadow: #3523a940 0px 8px 30px;
    ${props => props.width === true && "width: 100vw;"}
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    position: relative;
    z-index: 2;
    height: 100vh;
    overflow-x: clip;
    overflow-y: auto;
`;

export default Chat;
