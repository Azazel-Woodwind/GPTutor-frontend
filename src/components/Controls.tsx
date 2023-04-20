import React from "react";
import styled from "styled-components";
import { BaseInputStyle } from "../components/Textfield";
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

const Controls = ({ prompts, hook: { sendMessage }, height, prompt }) => {
    const [placeholder] = React.useState(
        prompts
            ? prompts[Math.floor(Math.random() * prompts.length)] + " ⏎"
            : "Send message"
    );

    const location = useLocation();
    const messageInput = React.useRef(undefined);

    const onSubmit = e => {
        e.preventDefault();

        const message = messageInput.current.value;
        messageInput.current.value = "";

        if (message.replaceAll(" ", "") == "") return;
        sendMessage(message, { path: location.pathname });
        messageInput.current.focus();
    };

    const { Socket } = React.useContext(SocketContext);

    const { startRecording, stopRecording, transcript, recording } = useWhisper(
        {
            Socket,
        }
    );

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
            console.log(10);
            startRecording();
        },
        onAnimationEnd: () => {
            // console.log("ANIMATION STOPPED");
            stopRecording();
        },
    });

    React.useEffect(() => {
        if (transcript) {
            messageInput.current.value = transcript;
        }
    }, [transcript]);

    return (
        <Container>
            <FillingButton
                {...MicSvgData}
                scale={1.2}
                duration={3}
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
            <form onSubmit={onSubmit}>
                <ChatInput ref={messageInput} placeholder={placeholder} />
            </form>
            <IconButton
                scale={1.2}
                outline
                {...CrossSvgData}
                onClick={() => (messageInput.current.value = "")}
                iconSize={30}
            />
            {/* <IconButton scale={1.2} outline {...SendSvgData} iconSize={22} /> */}
            <CustomButton
                onClick={onSubmit}
                style={{ padding: "10px", borderRadius: "7px" }}
                whileHoverScale={1.1}>
                <Send size={22} />
            </CustomButton>
        </Container>
    );
};

const ChatInput = styled(BaseInputStyle)`
    border-radius: 15px;
    border: 1px solid #f3f3f3;
    padding: 0.5em 2em;
`;

const Container = styled.div`
    background-color: rgb(0, 0, 0, 0.2);
    border-top: 1px solid ${props => props.theme.colours.primary}30;
    width: 100%;
    padding: 1em 2em;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 0.5em;

    form {
        flex: 1 1 0;
    }
`;

export default Controls;
