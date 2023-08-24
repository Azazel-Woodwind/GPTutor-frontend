import { motion } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components";

const lineHeight = 1.25;

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
        `
        white-space: nowrap;
        text-overflow: ellipsis;
    `}
`;

export default CollapsableText;
