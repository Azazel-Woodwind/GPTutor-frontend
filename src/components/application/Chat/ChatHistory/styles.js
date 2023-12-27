import styled from "styled-components";
import { motion } from "framer-motion";

export const ChatHistoryStyle = styled.div`
    width: 100%;
    padding: 1rem 1rem;
    padding-top: 0.8rem;
    overflow-x: clip;
    overflow-y: auto;
    flex: 1 1 auto;
`;

export const Container = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1000;
`;

export const DraggableChat = styled(motion.div)`
    /* border: 5px solid black; */
    position: absolute;
    z-index: 100;
    bottom: 0;
    width: 100%;
    box-shadow: #3523a940 0px 0px 50rem;
    background-color: #13133a;
    display: flex;
    flex-direction: column;
`;

export const ChatHandle = styled.div`
    width: 100%;
    height: ${handleHeight}px;
    background-color: transparent;
    cursor: ns-resize;

    :hover,
    :active {
        background-color: ${props => props.theme.colours.secondary};
    }

    transition: background-color 0.2s ease;
`;

export const ChatHandleContainer = styled.div`
    user-select: none;
`;
