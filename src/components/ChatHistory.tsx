import React from "react";
import styled from "styled-components";
import Message from "./Message";
import { motion, useMotionValue } from "framer-motion";

const ChatHistoryStyle = styled.div`
    height: 100%;
    width: 100%;
    padding: 1em 1em;
    padding-top: 0.8em;
    overflow-x: clip;
    overflow-y: auto;

    /* background-color: black; */
`;

const DirectionReverse = styled.div`
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
`;

const Container = styled(motion.div)`
    /* height: ${props => props.height && props.height}px; */
    width: 100%;
    height: 100%;
    position: relative;
    /* border: 5px solid blue; */
    flex: 1 1 auto;
`;

const DraggableChat = styled(motion.div)`
    /* border: 5px solid black; */
    position: absolute;
    z-index: 100;
    bottom: 0;
    width: 100%;
    box-shadow: #3523a940 0px 0px 900px;
    background-color: #13133a;
    display: flex;
    flex-direction: column;
`;

const ChatHandle = styled.div`
    width: 100%;
    height: 7px;
    background-color: transparent;
    cursor: ns-resize;

    :hover,
    :active {
        background-color: blue;
    }

    transition: background-color 0.2s ease;
`;

const ChatHandleContainer = styled.div``;

function ChatHistory({
    containerHeight,
    prompt,
    hook: { history, currentMessage },
}) {
    const chatHistoryHeight = useMotionValue("100%");

    const handleRef = React.useRef(null);
    const draggableChatRef = React.useRef(null);
    const chatHandleContainer = React.useRef(null);

    const [startedDragging, setStartedDragging] = React.useState(false);

    const onDrag = (_, info) => {
        const oldY = handleRef.current.getBoundingClientRect().y;
        const newY = oldY + info.delta.y;
        info.delta.y = newY < 0 ? -oldY : info.delta.y;
        const newHeight = chatHistoryHeight.get() - info.delta.y;
        chatHistoryHeight.set(Math.max(newHeight, 5));
        containerHeight.set(Math.max(containerHeight.get() - info.delta.y, 75));
    };

    React.useEffect(() => {
        chatHistoryHeight.set(
            draggableChatRef.current.getBoundingClientRect().height
        );
    }, []);

    return (
        <Container>
            <DraggableChat
                ref={draggableChatRef}
                style={{
                    height: chatHistoryHeight,
                    // border: "3px solid blue",
                }}>
                <ChatHandleContainer ref={chatHandleContainer}>
                    <ChatHandle
                        key="chat-handle"
                        ref={handleRef}
                        as={motion.div}
                        drag="y"
                        dragConstraints={chatHandleContainer}
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={onDrag}
                    />
                </ChatHandleContainer>
                <DirectionReverse>
                    <ChatHistoryStyle>
                        <Message type={"system"} message={prompt} />
                        {history.map((chat, i) => {
                            return (
                                <Message
                                    key={i}
                                    type={chat.role}
                                    message={chat.content}
                                />
                            );
                        })}
                        {currentMessage && (
                            <Message
                                type={"assistant"}
                                message={currentMessage}
                            />
                        )}
                    </ChatHistoryStyle>
                </DirectionReverse>
            </DraggableChat>
        </Container>
    );
}

export default ChatHistory;
