import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { CrossSvgData, MicSvgData } from "@/lib/svgIconData";
import Button from "@/components/common/input/Button";
import { Send } from "@styled-icons/material/Send";
import CenteredRow from "@/components/common/layout/CenteredRow";
import { MAX_PROMPT_LENGTH } from "@/lib/constants";
import { useChatContext } from "@/context/ChatContext";
import useFillingButton from "@/hooks/useFillingButton";
import useWhisper from "@/hooks/useWhisper";
import { SocketContext } from "@/context/SocketContext";
import IconButton from "@/components/common/input/IconButton";
import { TextInputStyle } from "@/components/common/input/Textfield/TextInput/TextInput.styles";
import { MAX_INITIAL_VOICE_WAIT, MAX_VOICE_WAIT } from "@/lib/constants";

const ChatForm = styled.form`
    position: relative;
    /* border: 3px solid blue; */
    flex: 1 1 0;
    height: 100%;
`;

const ChatInput = styled(TextInputStyle)`
    border-radius: 0.94rem;
    border: 1px solid #f3f3f3;
    padding: 0.5rem 2rem;

    //hide the scrollbar
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`;

const Container = styled(CenteredRow)`
    position: relative;
    z-index: 1000;
    background-color: rgb(15, 13, 27);
    border-top: 1px solid ${props => props.theme.colours.primary}30;

    width: 100%;
    padding: 1rem 2rem;
    /* height: 100%; */

    flex: 0 1 auto;
    /* border-bottom: 2px solid white; */
`;

/**
 * Controls - A component that provides chat input, send button, and voice recording functionality.
 * It handles message input and sending, voice command recording, and controls for clearing the input.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.prompts - An array of prompts for the chat input placeholder.
 * @param {Object} props.hook - Hook containing methods and states for sending messages and handling voice commands.
 * @param {Function} props.hook.sendMessage - Function to send chat messages.
 * @param {boolean} props.hook.streaming - State indicating if streaming is active.
 * @param {boolean} props.hook.loading - State indicating if the system is processing.
 * @param {boolean} props.hook.finishedLearningObjective - State indicating if the learning objective is finished.
 * @returns {React.Component} A component with chat controls including text input, send button, and voice recording.
 */
function Controls({
    prompts,
    hook: { sendMessage, streaming, loading, finishedLearningObjective },
}) {
    const [placeholder] = React.useState(
        prompts
            ? prompts[Math.floor(Math.random() * prompts.length)]
            : "Send message"
    );

    const [messageInput, setMessageInput] = React.useState(undefined);
    const [hasSpoken, setHasSpoken] = React.useState(false);

    const location = useLocation();
    const messageInputRef = React.useRef(undefined);
    const chatFormRef = React.useRef(undefined);
    const timer = React.useRef(null);

    const handleChangeInput = text => {
        if (text.length > MAX_PROMPT_LENGTH) {
            setMessageInput(text.slice(0, MAX_PROMPT_LENGTH).trim());
        } else {
            setMessageInput(text);
        }
    };

    const onSubmit = e => {
        e && e.preventDefault();

        if (recording) {
            return;
        }

        if (messageInput.replaceAll(" ", "") == "") return;
        if (
            sendMessage({
                message: messageInput,
                context: { path: location.pathname },
            })
        ) {
            setMessageInput("");
        }
        messageInputRef.current.focus();
    };

    const { Socket } = React.useContext(SocketContext);

    const {
        startRecording,
        stopRecording,
        transcript,
        recording,
        finalTranscript,
        speaking,
    } = useWhisper({
        Socket,
    });

    // console.log("RECORDING:", recording);

    const {
        Component: FillingButton,
        ComponentProps,
        startAnimation,
        pauseAnimation,
        resumeAnimation,
        stopAnimation,
        filling,
        paused,
    } = useFillingButton({
        onAnimationStart: async () => {
            setHasSpoken(false);
            await startRecording();
            timer.current = setTimeout(() => {
                console.log("MAX INITIAL WAIT TIME REACHED");
                stopAnimation();
            }, MAX_INITIAL_VOICE_WAIT);
        },
        onAnimationEnd: () => {
            console.log("ANIMATION STOPPED");
            stopRecording();
        },
    });

    React.useEffect(() => {
        if (speaking) {
            if (!hasSpoken) {
                console.log("SPOKEN FOR THE FIRST TIME");
                setHasSpoken(true);
            }
            clearTimeout(timer.current);
            return;
        }

        if (hasSpoken) {
            timer.current = setTimeout(() => {
                console.log("MAX WAIT TIME REACHED");
                stopAnimation();
            }, MAX_VOICE_WAIT);
        }
    }, [speaking]);

    React.useEffect(() => {
        if (transcript) {
            setMessageInput(transcript);
        }
    }, [transcript]);

    React.useEffect(() => {
        if (finalTranscript) {
            console.log("SENDING FINAL TRANSCRIPT");
            if (finalTranscript.replaceAll(" ", "") == "") return;
            if (
                sendMessage({
                    message: finalTranscript,
                    context: { path: location.pathname },
                })
            ) {
                setMessageInput("");
            }
            messageInputRef.current.focus();
        }
    }, [finalTranscript]);

    React.useEffect(() => {
        if (messageInput == undefined) {
            return;
        }

        messageInputRef.current.style.height = 0;
        messageInputRef.current.style.height =
            Math.max(
                chatFormRef.current?.offsetHeight,
                messageInputRef.current.scrollHeight
            ) + "px";
    }, [messageInput]);

    const { width, draggable } = useChatContext();

    const handleKeyDown = React.useCallback(
        e => {
            if (
                !["INPUT", "TEXTAREA"].includes(e.target.tagName) &&
                e.code === "Space" &&
                draggable !== false &&
                width !== 0
            ) {
                toggleRecord();
            }
        },
        [width, draggable]
    );

    const handleKeyPress = React.useCallback(
        e => {
            if (
                location.pathname === "/hub" &&
                messageInputRef.current &&
                document.activeElement !== messageInputRef.current
            ) {
                e.preventDefault();
                messageInputRef.current?.focus();
                messageInputRef.current.value += e.key;
                handleChangeInput(messageInputRef.current.value);
            }
        },
        [location]
    );

    React.useEffect(() => {
        
        document.addEventListener("keypress", handleKeyPress);

        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [handleKeyPress]);

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    // console.log(messageInput, streaming, loading);

    const sendDisabled =
        !messageInput?.trim() ||
        streaming ||
        loading ||
        recording ||
        finishedLearningObjective;
    const micDisabled = streaming || loading || finishedLearningObjective;

    const toggleRecord = () => {
        if (filling) {
            stopAnimation();
        } else {
            startAnimation();
        }
    };

    return (
        <Container gap="0.625rem">
            <FillingButton
                {...MicSvgData}
                {...ComponentProps}
                scale={1.2}
                duration={10}
                iconSize={23}
                recording={recording}
                onClick={toggleRecord}
                disabled={micDisabled}
                speaking={speaking}
            />
            <ChatForm ref={chatFormRef} onSubmit={onSubmit}>
                <ChatInput
                    as="textarea"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgb(15, 13, 27)",
                    }}
                    onChange={e => handleChangeInput(e.target.value)}
                    onFocus={e => {
                        e.target.style.height = 0;
                        e.target.style.height =
                            Math.max(
                                chatFormRef.current?.offsetHeight,
                                e.target.scrollHeight
                            ) + "px";
                    }}
                    onBlur={e => {
                        e.target.style.height = "100%";
                    }}
                    onKeyDown={e => {
                        if (e.key == "Enter") {
                            e.preventDefault();
                            if (!e.shiftKey && !sendDisabled) {
                                onSubmit();
                            }
                        } else if (e.key == "Space") {
                            e.stopPropagation();
                        }
                    }}
                    ref={messageInputRef}
                    value={messageInput}
                    placeholder={placeholder}
                />
            </ChatForm>
            <IconButton
                {...CrossSvgData}
                scale={1.2}
                outline
                onClick={() => setMessageInput("")}
                iconSize={30}
            />
            <Button
                disabled={sendDisabled}
                onClick={onSubmit}
                style={{ padding: "0.625rem", borderRadius: "7px" }}
                whileHoverScale={1.1}>
                <Send size={22} />
            </Button>
        </Container>
    );
}

export default Controls;
