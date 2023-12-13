import CenteredColumn from "@/components/common/layout/CenteredColumn";
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import useFillingButton from "@/hooks/useFillingButton/useFillingButton";
import { SocketContext, SocketContextProvider } from "@/context/SocketContext";
import Textfield from "@/components/common/input/Textfield";
import FillingButton from "./FillingButton";

function Main() {
    return (
        <CenteredColumn fillparent>
            <FillingButton />
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
