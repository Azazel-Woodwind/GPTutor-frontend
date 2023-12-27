import { motion } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components";

const lineHeight = 1.25;

/**
 * CollapsableText - A component to display text that can be toggled between a collapsed and expanded state.
 * In its collapsed state, the text is truncated with an ellipsis. When expanded, it shows the full text.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The text content to be displayed and collapsed.
 * @param {boolean} [props.collapsable=true] - Determines if the text can be collapsed/expanded.
 * @param {boolean} [props.collapsed] - Controls the collapsed state of the text. If not provided, internal state is used.
 * @param {Function} [props.setCollapsed] - Function to set the collapsed state from outside the component. If not provided, internal state control is used.
 * @returns {React.Component} A component that renders collapsable text with a control to toggle its state.
 */
function CollapsableText({
    children,
    collapsable = true,
    collapsed,
    setCollapsed,
    ...props
}) {
    const [state, setState] = React.useState(false);
    collapsed = collapsed ?? state;
    setCollapsed = setCollapsed ?? setState;
    const [fullyCollapsed, setFullyCollapsed] = React.useState(false);

    // console.log(collapsed, fullyCollapsed);

    return (
        <Container
            collapsed={collapsed}
            fullyCollapsed={fullyCollapsed}
            animate={collapsed ? "collapsed" : "open"}
            initial={false}
            variants={{
                open: { maxHeight: "15em" },
                collapsed: {
                    maxHeight: `${lineHeight + 2}em`,
                },
            }}
            onAnimationComplete={() => setFullyCollapsed(collapsed)}
            {...props}>
            <motion.div
                variants={{
                    open: { rotate: 180 },
                    collapsed: { rotate: 0 },
                }}
                onClick={() => collapsable && setCollapsed(!collapsed)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                    originY: 0.55,
                    position: "absolute",
                    left: "1em",
                    top: "1em",
                    cursor: collapsable ? "pointer" : "auto",
                }}>
                <svg width="15" height="15" viewBox="0 0 20 20">
                    <path
                        fill={collapsable ? "white" : "grey"}
                        d="M0 7 L 20 7 L 10 16"
                    />
                </svg>
            </motion.div>
            {children}
        </Container>
    );
}

const Container = styled(motion.div)`
    position: relative;
    font-size: 1.2em;

    padding: 1em;
    padding-left: 3em;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5em;

    line-height: ${lineHeight}em;

    width: fit-content;
    max-width: 100%;
    overflow: hidden;

    ${props =>
        props.collapsed &&
        props.fullyCollapsed &&
        css`
            white-space: nowrap;
            text-overflow: ellipsis;
        `}
`;

export default CollapsableText;
