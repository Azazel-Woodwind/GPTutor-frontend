import React from "react";
import Theme from "@/styles/Theme";
import { HEADER_HEIGHT_IN_REM } from "@/lib/measurements";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useHeader } from "@/context/HeaderContext";

const variants = {
    hidden: { y: `-${HEADER_HEIGHT_IN_REM}rem` },
    visible: {
        y: 0,
    },
    coloured: {
        y: 0,
        backgroundColor: Theme.colours.highlight1,
    },
};

const Container = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0.8%;
    color: white;
    z-index: 10;
    /* border: 2px solid red; */
    padding: 0px 3.125rem;
    height: ${HEADER_HEIGHT_IN_REM}rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

function HeaderContainer({ children }) {
    const { showHeader, showBoxShadow } = useHeader();

    return (
        <Container
            showBoxShadow={showBoxShadow}
            initial="hidden"
            animate={
                showHeader ? (showBoxShadow ? "coloured" : "visible") : "hidden"
            }
            variants={variants}
            transition={{ duration: 0.3, type: "tween" }}>
            {children}
        </Container>
    );
}

export default HeaderContainer;
