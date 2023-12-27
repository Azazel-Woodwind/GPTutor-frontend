import React from "react";
import { motion, useMotionValue } from "framer-motion";
import ChatEntry from "./ChatEntry/ChatEntry";
import {
    ChatHandle,
    ChatHandleContainer,
    ChatHistoryStyle,
    Container,
    DraggableChat,
} from "./styles";

const handleHeight = 7;

/**
 * ChatHistory - A component for displaying a chat history with draggable handle for resizing.
 * It renders chat entries and manages the chat history's height dynamically.
 *
 * @param {Object} props - The component props.
 * @param {number} props.containerHeight - Motion value for the height of the chat container.
 * @param {Object} props.hook - Object containing the chat history and current message.
 * @param {Array} props.hook.history - Array of chat history entries.
 * @param {string} props.hook.currentMessage - The current active message.
 * @returns {React.Component} A chat history component with resizable chat area.
 */
function ChatHistory({ containerHeight, hook: { history, currentMessage } }) {
    const chatHistoryHeight = useMotionValue("100%");

    const [scrolledToBottom, setScrolledToBottom] = React.useState(true);

    const handleRef = React.useRef(null);
    const chatHandleContainer = React.useRef(null);
    const chatHistoryRef = React.useRef(null);

    const onDrag = (_, info) => {
        const oldY = handleRef.current.getBoundingClientRect().y;
        const newY = oldY + info.delta.y;
        info.delta.y = newY < 0 ? -oldY : info.delta.y;

        const newHeight = chatHistoryHeight.get() - info.delta.y;
        chatHistoryHeight.set(Math.max(newHeight, handleHeight));
        containerHeight.set(Math.max(containerHeight.get() - info.delta.y, 75));
    };

    const setHeight = React.useCallback(ref => {
        if (ref) {
            chatHistoryHeight.set(Math.max(ref.offsetHeight, handleHeight));
        }
    }, []);

    React.useEffect(() => {
        if (scrolledToBottom) {
            chatHistoryRef.current.scrollTop =
                chatHistoryRef.current.scrollHeight;
        }
    }, [currentMessage, history]);

    return (
        <Container>
            <DraggableChat
                ref={setHeight}
                style={{
                    height: chatHistoryHeight,
                }}>
                <ChatHandleContainer ref={chatHandleContainer}>
                    <ChatHandle
                        key="chat-handle"
                        ref={handleRef}
                        as={motion.div}
                        onMouseDown={e => {
                            e.preventDefault();
                        }}
                        drag="y"
                        dragConstraints={chatHandleContainer}
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={onDrag}
                    />
                </ChatHandleContainer>
                <ChatHistoryStyle
                    ref={chatHistoryRef}
                    onScroll={() => {
                        setScrolledToBottom(
                            chatHistoryRef.current.scrollHeight -
                                chatHistoryRef.current.clientHeight <=
                                chatHistoryRef.current.scrollTop + 1
                        );
                    }}>
                    {/* <Message type={"system"} message={prompt} /> */}
                    {history.map((chat, i) => {
                        return (
                            <ChatEntry
                                key={i}
                                type={chat.role}
                                message={chat.content}
                            />
                        );
                    })}
                    {currentMessage && (
                        <ChatEntry
                            type={"assistant"}
                            message={currentMessage}
                        />
                    )}
                </ChatHistoryStyle>
            </DraggableChat>
        </Container>
    );
}

export default ChatHistory;
