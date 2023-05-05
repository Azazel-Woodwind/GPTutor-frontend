import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import IconWrapperStyle from "../styles/IconWrapper";
import { ChatContext } from "../context/ChatContext";
import { useLocation } from "react-router-dom";
import IconButton from "../components/IconButton";
import { CrossSvgData, MicSvgData, SendSvgData } from "../lib/svgIconData";
import useFillingButton from "../hooks/useFillingButton";
import useWhisper from "../hooks/use-whisper";
import { SocketContext } from "../context/SocketContext";
import CustomButton from "./Button";
import { Send } from "@styled-icons/material/Send";
import { BaseInputStyle } from "./BaseInput";
import CenteredRow from "../styles/containers/CenteredRow";

const Controls = ({
    prompts,
    hook: { sendMessage, streaming, loading },
    height,
    prompt,
}) => {
    const [placeholder] = React.useState(
        prompts
            ? prompts[Math.floor(Math.random() * prompts.length)]
            : "Send message"
    );

    const [chatHeight, setChatHeight] = React.useState("100%");
    const [messageInput, setMessageInput] = React.useState("");

    const location = useLocation();
    const messageInputRef = React.useRef(undefined);
    const chatFormRef = React.useRef(undefined);

    const onSubmit = e => {
        e && e.preventDefault();

        if (messageInput.replaceAll(" ", "") == "") return;
        if (sendMessage(messageInput, { path: location.pathname })) {
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
    } = useWhisper({
        Socket,
    });

    // console.log("RECORDING:", recording);

    const {
        Component: FillingButton,
        startAnimation,
        pauseAnimation,
        resumeAnimation,
        stopAnimation,
        filling,
        paused,
    } = useFillingButton({
        onAnimationStart: () => {
            // console.log(10);
            startRecording();
        },
        onAnimationEnd: () => {
            // console.log("ANIMATION STOPPED");
            stopRecording();
        },
    });

    React.useEffect(() => {
        if (transcript) {
            setMessageInput(transcript);
        }
    }, [transcript]);

    React.useEffect(() => {
        if (finalTranscript) {
            console.log("SENDING FINAL TRANSCRIPT");
            if (finalTranscript.replaceAll(" ", "") == "") return;
            if (sendMessage(finalTranscript, { path: location.pathname })) {
                setMessageInput("");
            }
            messageInputRef.current.focus();
        }
    }, [finalTranscript]);

    // console.log(messageInput, streaming, loading);

    return (
        <Container gap="10px">
            <FillingButton
                {...MicSvgData}
                scale={1.2}
                duration={10}
                iconSize={23}
                recording={recording}
                onClick={() => {
                    if (filling) {
                        stopAnimation();
                    } else {
                        startAnimation();
                    }
                }}
            />
            <ChatForm ref={chatFormRef} onSubmit={onSubmit}>
                <ChatInput
                    style={{ height: "100%" }}
                    // as="textarea"
                    // style={{
                    //     position: "absolute",
                    //     bottom: 0,
                    //     width: "100%",
                    //     height: chatHeight,
                    // }}
                    // onChange={e => {
                    //     console.log("scroll height", e.target.scrollHeight);
                    //     console.log(
                    //         "form height",
                    //         chatFormRef.current?.getBoundingClientRect().height
                    //     );
                    //     setChatHeight(
                    //         Math.max(
                    //             chatFormRef.current?.getBoundingClientRect()
                    //                 .height,
                    //             e.target.scrollHeight
                    //         ) + "px"
                    //     );
                    // }}
                    // onFocus={e => {
                    //     setChatHeight(
                    //         Math.max(
                    //             chatFormRef.current?.getBoundingClientRect()
                    //                 .height,
                    //             e.target.scrollHeight
                    //         ) + "px"
                    //     );
                    // }}
                    // onBlur={e => {
                    //     setChatHeight("100%");
                    // }}
                    ref={messageInputRef}
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
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
            <CustomButton
                disabled={messageInput == "" || streaming || loading}
                onClick={onSubmit}
                style={{ padding: "10px", borderRadius: "7px" }}
                whileHoverScale={1.1}>
                <Send size={22} />
            </CustomButton>
        </Container>
    );
};

const ChatForm = styled.form`
    position: relative;
    /* border: 3px solid blue; */
    flex: 1 1 0;
    height: 100%;
`;

const ChatInput = styled(BaseInputStyle)`
    border-radius: 15px;
    border: 1px solid #f3f3f3;
    padding: 0.5em 2em;
`;

const Container = styled(CenteredRow)`
    position: relative;
    z-index: 1000;
    background-color: rgb(15, 13, 27);
    border-top: 1px solid ${props => props.theme.colours.primary}30;

    width: 100%;
    padding: 1em 2em;

    flex: 0 1 auto;
`;

export default Controls;
