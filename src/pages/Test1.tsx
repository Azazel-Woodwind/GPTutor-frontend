import Centerer from "../styles/containers/Centerer";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "../components/Button";

const TestButton = styled(motion.button)`
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    overflow: hidden;
    outline: none;
    padding: 1em;
    padding-right: 2em;
    padding-left: 2em;

    /* &:focus-visible {
        outline: none;
    }

    ::before {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        background-color: transparent;
        border-radius: 6px;
        z-index: -2;
    } */
`;

const ButtonText = styled.span`
    position: relative;
    z-index: 1;
    color: transparent;
    background: linear-gradient(
        149deg,
        #58c1fe 0%,
        rgba(36, 170, 255, 1) 25%,
        rgba(1, 99, 255, 1) 75%,
        #58c1fe 100%
    );
    background-size: 800% auto;
    animation: gradient 5s linear infinite;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    pointer-events: none;
`;

const SvgBorder = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

function Test() {
    return (
        <Centerer gap="2em">
            <TestButton whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                <SvgBorder
                    viewBox="0 0 420 150"
                    preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient
                            id="gradient"
                            x1="0"
                            y1="0"
                            x2="100%"
                            y2="0"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="#58c1fe" />
                            <stop
                                offset="25%"
                                stop-color="rgba(36, 170, 255, 1)"
                            />
                            <stop
                                offset="75%"
                                stop-color="rgba(1, 99, 255, 1)"
                            />
                            <stop offset="100%" stop-color="#58c1fe" />
                            <animate
                                attributeName="x1"
                                from="0"
                                to="100%"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="x2"
                                from="100%"
                                to="200%"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                        </linearGradient>
                        <mask id="inner-mask">
                            <rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                rx="30"
                                fill="white"
                            />
                            {/* <rect
                                x="4"
                                y="4"
                                width="92"
                                height="92"
                                rx="10"
                                fill="black"
                            /> */}
                        </mask>
                    </defs>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="30"
                        fill="none"
                        stroke="url(#gradient)"
                        stroke-width="15"
                        mask="url(#inner-mask)"
                    />
                </SvgBorder>
                <ButtonText>Button text</ButtonText>
            </TestButton>
            <Button>Button text</Button>
        </Centerer>
    );
}

export default Test;

// HAHAHA is it np
