import { motion, useMotionValue } from "framer-motion";
import React from "react";
import ChatHistory from "./ChatHistory";
import Controls from "./Controls";
import styled from "styled-components";

const ChatSection = ({ hook, prompt, prompts, ...props }) => {
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

const BottomSection = styled(motion.div)`
    /* max-width: 1200px;*/
    width: 100%;
    display: flex;
    flex-direction: column;

    /* font-size: 3rem; */
    /* border: 5px solid red; */
`;

export default ChatSection;
