import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const TooltipContainer = styled(motion.span)`
    user-select: none;
    position: absolute;
    max-width: 80ch;
    ${props => (props.underneath ? "bottom" : "top")}: -2.8rem;
    color: ${props => props.theme.colours.primary};
    max-height: 1rem;
    height: fit-content;
    padding: 0.5rem;
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

/**
 * Tooltip - A component for displaying a tooltip with a label.
 * The tooltip can be configured to appear above or underneath the child element.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child element that the tooltip is associated with.
 * @param {string} props.label - The text content to be displayed inside the tooltip.
 * @param {boolean} [props.underneath=false] - Determines the position of the tooltip. If true, the tooltip appears underneath the child element.
 * @param {boolean} [props.show=false] - Controls the visibility of the tooltip. If true, the tooltip is always visible.
 * @returns {React.Component} A tooltip component that appears in relation to its child element.
 */
function Tooltip({ children, label, underneath, show }) {
    const [visible, setVisible] = React.useState(false);

    return (
        <Wrapper
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}>
            <AnimatePresence>
                {(visible || show) && (
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
}

export default Tooltip;
