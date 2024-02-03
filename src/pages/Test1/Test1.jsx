import CenteredColumn from "@/components/common/layout/CenteredColumn";
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import useFillingButton from "@/hooks/useFillingButton";
import { SocketContext, SocketContextProvider } from "@/context/SocketContext";
import Textfield from "@/components/common/input/Textfield";
import FillingButton from "./FillingButton";
import Slider from "@/components/common/input/Slider";
import Button from "@/components/common/input/Button";

const TestButton = styled(motion.button)`
    /* width: 1px; */
    padding: 1rem 2rem;
    border: 2px solid black;
    border-radius: 0.5rem;
    background-color: white;
    color: black;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    outline: none;
`;

const variants = {
    idle: {
        rotate: [0, 0, 8, -8, 0, 0, 0],
        scale: [1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
        transition: {
            repeat: Infinity,
            duration: 1,
            delay: 2,
            repeatDelay: 5,
        },
    },
    hover: {
        scale: 1.05,
        rotate: 0,
        transition: {
            scale: {
                duration: 0.1,
            },
        },
    },
    tap: {
        scale: 0.95,
        rotate: 0,
        transition: { duration: 0.1 },
    },
};

function Main() {
    const [state, setState] = React.useState();

    return (
        <CenteredColumn fillparent>
            <Button
                gestures={false}
                style={{ borderRadius: "3rem" }}
                size="xl"
                animate="idle"
                variants={variants}
                whileHover="hover"
                whileTap="tap">
                Join the Waiting List
            </Button>
            <Slider
                // min={0}
                // max={1}
                // step={0.01}
                // value={0.5}
                value={state}
                onChange={setState}></Slider>
        </CenteredColumn>
    );
}

function Test1() {
    return (
        <SocketContextProvider>
            <Main />
        </SocketContextProvider>
    );
}

const TestContainer = styled(motion.div)`
    width: 600px;
    padding: 1rem;
    line-height: 1.25rem;
    background-color: rgba(255, 255, 255, 0.1);
    overflow: hidden;

    ${props =>
        props.closed &&
        !props.open &&
        `
        white-space: nowrap;
        text-overflow: ellipsis;
    `}
`;

const Container = styled.div`
    width: 600px;
`;

export default Test1;
