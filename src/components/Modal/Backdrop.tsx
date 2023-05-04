import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const BackdropStyle = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000000000000;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

function Backdrop({ children, onClick }) {
    return (
        <BackdropStyle
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.2,
            }}>
            {children}
        </BackdropStyle>
    );
}

export default Backdrop;
