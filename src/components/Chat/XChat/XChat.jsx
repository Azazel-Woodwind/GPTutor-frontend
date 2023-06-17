import React from "react";
import styled from "styled-components";
import { ChatContext } from "../../../context/ChatContext";
import Navigation from "../../Navigation";
import useXConversation from "../../../hooks/useX/useXConversation";
import Resizable from "../../Resizable";
import ChatSection from "../ChatSection";
import XAvatar from "../../XAvatar";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";
import Button from "../../input/Button";
import useModal from "../../../hooks/useModal";
import SetActivityModal from "./SetActivityModal";

const prompts = [
    "Hi X. Can you show me the available lessons?",
    "Help me get started with GCSE math?",
    "How does this page work?",
    "What subjects can you teach?",
    "Explain basic algebra",
];

const XChat = props => {
    const { width } = React.useContext(ChatContext);
    const hook = useXConversation();
    const location = useLocation();
    // const chat = useChat({ hook });

    const { Modal: SetActivityModalComponent, ...Modal } = useModal({
        initialOpen: false,
    });

    return (
        <Resizable number={width} min={400}>
            <Window>
                <Navigation />
                <AvatarContainer>
                    <XAvatar
                        size={120}
                        {...hook}
                        hasControls
                        showExamplePrompts
                    />
                </AvatarContainer>
                <ChatSection
                    hook={hook}
                    prompt="This is X, your personal AI tutor. You can have him navigate the application for you, or for example answer any questions related to the application or your subjects"
                    prompts={prompts}
                />
                {location.pathname === "/hub" && (
                    <ActivityButton
                        onClick={() => {
                            Modal.handleOpen();
                        }}>
                        Set Activity
                    </ActivityButton>
                )}
            </Window>

            <SetActivityModalComponent {...Modal.ModalProps} type="dropIn">
                <SetActivityModal handleClose={Modal.handleClose} X={hook} />
            </SetActivityModalComponent>
        </Resizable>
    );
};

const ActivityButton = styled(Button)`
    position: absolute;
    top: 20px;
    left: 50px;
`;

const AvatarContainer = styled.div`
    flex-grow: 1;
    margin: 10px;
    margin-top: 40px;
`;

const Window = styled.div`
    display: flex;
    width: 100%;
    background-color: ${props => props.theme.colours.tertiary}50;
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
    position: relative;
`;

export default XChat;
