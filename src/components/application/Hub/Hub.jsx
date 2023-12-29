import React from "react";
import styled from "styled-components";
import ChatSection from "../Chat";
import XAvatar from "@/components/application/XAvatar";
import { useLocation } from "react-router-dom";
import Button from "@/components/common/input/Button";
import useModal from "@/hooks/useModal";
import SetActivityModal from "./SetActivityModal/SetActivityModalNew";
import { HEADER_HEIGHT_IN_REM } from "@/lib/measurements";
import { ChatContext } from "@/context/ChatContext";
import useXConversation from "@/components/application/Hub/useXConversation";
import Resizable from "@/components/application/Hub/Resizable";

const ActivityButton = styled(Button)`
    position: absolute;
    top: 1.8rem;
    right: 3.125rem;
    /* z-index: 100; */
`;

const AvatarContainer = styled.div`
    flex-grow: 1;
    margin: 0.625rem;
    /* margin-top: 2.5rem; */
`;

const Window = styled.div`
    display: flex;
    width: 100%;
    background-color: ${props => props.theme.colours.tertiary}50;
    box-shadow: #3523a940 0px 8px 1.875rem;
    ${props => props.width === true && "width: 100vw;"}
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    position: relative;
    /* z-index: 2; */
    height: 100vh;
    overflow-x: clip;
    overflow-y: auto;
    position: relative;

    padding-top: ${HEADER_HEIGHT_IN_REM}rem;
`;

const prompts = [
    "Hi X. Can you show me the available lessons?",
    "Help me get started with GCSE math?",
    "How does this page work?",
    "What subjects can you teach?",
    "Explain basic algebra",
];
function Hub() {
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
                <AvatarContainer>
                    <XAvatar
                        appear
                        size={120}
                        {...hook}
                        hasControls
                        showExamplePrompts={hook.history < 2}
                    />
                </AvatarContainer>
                <ChatSection
                    hook={hook}
                    prompt="This is X, your personal AI tutor. You can have him navigate the application for you, or for example answer any questions related to the application or your subjects"
                    prompts={prompts}
                />
                {location.pathname === "/hub" && (
                    <>
                        {/* <LogoSvgAlt /> */}
                        <ActivityButton
                            onClick={() => {
                                Modal.handleOpen();
                            }}
                            size="lg">
                            Set Activity
                        </ActivityButton>
                    </>
                )}
            </Window>

            <SetActivityModalComponent
                {...Modal.ModalProps}
                type="dropIn"
                defaultModal={false}>
                <SetActivityModal handleClose={Modal.handleClose} X={hook} />
            </SetActivityModalComponent>
        </Resizable>
    );
}

export default Hub;
