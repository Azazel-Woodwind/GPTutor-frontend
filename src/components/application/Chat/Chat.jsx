import { motion, useMotionValue } from "framer-motion";
import React from "react";
import ChatHistory from "./ChatHistory";
import Controls from "./Controls";
import styled from "styled-components";

const BottomSection = styled(motion.div)`
    /* max-width: 1200px; */
    width: 100%;
    display: flex;
    flex-direction: column;
`;

/**
 * Chat - A component for displaying the chat interface, including the chat history and controls.
 * It manages the height of the chat container dynamically and is responsible for rendering the chat history and chat controls.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.hook - Object containing the chat history and current message.
 * @param {string} props.prompt - The initial prompt for the chat.
 * @param {Array} props.prompts - Array of prompts for the chat controls.
 * @returns {React.Component} A chat section component comprising chat history and chat controls.
 */
function Chat({ hook, prompt, prompts, ...props }) {
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
}

export default Chat;
