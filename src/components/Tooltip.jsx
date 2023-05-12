import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Tooltip = ({ children, label, underneath }) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <Wrapper
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}>
            <AnimatePresence>
                {visible && (
                    <TooltipContainer
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        underneath={underneath}>
                        {label}
                    </TooltipContainer>
                )}
            </AnimatePresence>
            {children}
        </Wrapper>
    );
};

const TooltipContainer = styled(motion.span)`
    position: absolute;
    max-width: 80ch;
    ${props => (props.underneath ? "bottom" : "top")}: -2.8em;
    color: ${props => props.theme.colours.primary};
    max-height: 1em;
    height: fit-content;
    padding: 0.5em;
    box-sizing: content-box;
    border-radius: 5px;
    font-size: 90%;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #21273f;
`;
const Wrapper = styled.div`
    position: relative;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Tooltip;
