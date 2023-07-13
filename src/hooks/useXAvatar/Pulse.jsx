import { motion } from "framer-motion";
import styled from "styled-components";
import FillParent from "../../styles/containers/FillParent";
import React from "react";

const animation = {
    boxShadow: [
        "0 0 0 2px rgba(52, 65, 97, 1)",
        "0 0 0 1px rgba(52, 65, 97, 0.8)",
        "0 0 0 1px rgba(52, 65, 97, 0)",
    ],
    backgroundColor: [
        "rgba(255, 255, 255, 0.1)",
        "rgba(255, 255, 255, 0.05)",
        "rgba(255, 255, 255, 0)",
    ],
    scale: [1, 3],
    opacity: [0.5, 1, 1],
};

const transition = {
    duration: 4,
    times: [0, 0.5, 1],
    ease: "easeOut",
};

const Pulse = ({ size, setRings }) => {
    const unmount = () => {
        setRings(prev => prev.slice(1));
    };

    return (
        <Ring
            as={motion.div}
            onAnimationComplete={unmount}
            size={size}
            animate={animation}
            transition={transition}
        />
    );
};

const Ring = styled(FillParent)`
    position: absolute;
    border-radius: 50%;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    z-index: 1;
`;

export default Pulse;
