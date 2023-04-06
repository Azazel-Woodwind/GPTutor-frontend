import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import Message from "./Message";
import GradientOutline from "../styles/GradientOutline";
import { MdBackspace, MdSend, MdKeyboardVoice } from "react-icons/md";
import { BaseInputStyle } from "./Textfield";
import { motion } from "framer-motion";
import { Resizable } from "react-resizable";
import IconWrapperStyle from "../styles/IconWrapper";
import { ChatContext } from "../context/ChatContext";
const prompts = [
    "Hi X. Can you show me lessons?",
    "Help me get started with GCSE math?",
    "How does this page work?",
    "What subjects can you teach?",
    "Explain basic algebra",
];

const Chat = props => {
    const [width, setWidth] = React.useContext(ChatContext);

    const placeholder =
        prompts[Math.floor(Math.random() * prompts.length)] + " ⏎";
    const onResize = (event, { node, size, handle }) => {
        setWidth(size.width);
    };

    return (
        <Resizable
            onResize={onResize}
            width={width}
            axis={"x"}
            minConstraints={[400, 400]}>
            <Window width={width}>
                <AvatarContainer>
                    <Avatar size={100} />
                </AvatarContainer>
                <ChatHistory>
                    <Message
                        type={"SYSTEM"}
                        message={
                            "Et veniam minim reprehenderit Lorem ea occaecat. Cillum mollit culpa consectetur qui id in laborum reprehenderit exercitation non adipisicing. Sunt voluptate sit quis non dolore laboris magna in. Labore reprehenderit magna anim sunt proident esse. Nisi adipisicing mollit consequat anim dolore culpa nostrud deserunt dolor."
                        }
                    />
                    <Message
                        type={"USER"}
                        message={
                            "Et veniam minim reprehenderit Lorem ea occaecat. Cillum mollit culpa consectetur qui id in laborum reprehenderit exercitation non adipisicing. Sunt voluptate sit quis non dolore laboris magna in. Labore reprehenderit magna anim sunt proident esse. Nisi adipisicing mollit consequat anim dolore culpa nostrud deserunt dolor."
                        }
                    />
                    <Message
                        type={"X"}
                        message={
                            "Laboris eiusmod nisi esse ipsum commodo duis minim ullamco nulla."
                        }
                    />
                    <Message
                        type={"USER"}
                        message={
                            "Et veniam minim reprehenderit Lorem ea occaecat. Cillum mollit culpa consectetur qui id in laborum reprehenderit exercitation non adipisicing. Sunt voluptate sit quis non dolore laboris magna in. Labore reprehenderit magna anim sunt proident esse. Nisi adipisicing mollit consequat anim dolore culpa nostrud deserunt dolor."
                        }
                    />
                    <Message
                        type={"X"}
                        message={
                            "Laboris eiusmod nisi esse ipsum commodo duis minim ullamco nulla."
                        }
                    />
                    <GradientOutline>
                        <Message
                            type={"USER"}
                            message={
                                "Et veniam minim reprehenderit Lorem ea occaecat. Cillum mollit culpa consectetur qui id in laborum reprehenderit exercitation non adipisicing. Sunt voluptate sit quis non dolore laboris magna in. Labore reprehenderit magna anim sunt proident esse. Nisi adipisicing mollit consequat anim dolore culpa nostrud deserunt dolor."
                            }
                        />
                    </GradientOutline>
                </ChatHistory>
                <Controls>
                    <IconWrapperStyle>
                        <MdKeyboardVoice />
                    </IconWrapperStyle>
                    <ChatInput placeholder={placeholder} />
                    <IconWrapperStyle>
                        <MdSend />
                    </IconWrapperStyle>

                    <IconWrapperStyle>
                        <MdBackspace />
                    </IconWrapperStyle>
                </Controls>
            </Window>
        </Resizable>
    );
};

const ChatInput = styled(BaseInputStyle)`
    border-radius: 15px;
    border: 1px solid #f3f3f3;
    padding: 0.5em 2em;
`;

const Icon = ({ icon }) => {
    return (
        <GradientOutline>
            <IconWrapperStyle> {icon} </IconWrapperStyle>
        </GradientOutline>
    );
};

const ChatHistory = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    padding: 1em 1em;
    overflow-y: scroll;
    overflow-x: clip;
    margin-top: 10em;
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
`;

const Window = styled.div`
    padding-top: 8em;
    /* ${props => !props.width && "visibility: hidden;"}; */
    border-top: 1px solid ${props => props.theme.colours.glow};
    box-shadow: #3523a940 0px 8px 30px;
    background-color: ${props => props.theme.colours.tertiary}90;
    width: ${props => props.width}px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    z-index: 2;
`;

export default Chat;
