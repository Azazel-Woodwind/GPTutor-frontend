import styled, { css } from "styled-components";
import XControls from "./XControls";
import { motion, useAnimationControls } from "framer-motion";
import React from "react";
import CenteredRow from "../../styles/containers/CenteredRow";
import { degreesToRadians } from "../../lib/misc";

// 8 different questions related to GCSE education that a student might ask
const examplePrompts = [
    "Can you explain the concept of electromagnetic waves and their various properties",
    "What are some effective study techniques for improving memory and retention of information?",
    "What are the key principles behind Newton's laws of motion, and how are they applied in physics problems?",
    "What strategies can I use to improve my problem-solving skills in algebraic equations?",
    "Can you quiz me on the key dates and events of the Cold War?",
    "Let's have a discussion about the key themes and motifs in Shakespeare's Macbeth",
    "Can you please make me comprehensive revision notes for the topic of photosynthesis for GCSE Biology?",
    "I don't understand how covalent bonds work. Can you please explain them to me?",
];

const MAX_ANGLE = 40;

const XAvatar = ({
    size,
    rings,
    pulse,
    controls,
    onClick,
    hasControls,
    toggleMute,
    paused,
    play,
    pause,
    setSpeed,
    showExamplePrompts,
    ...props
}) => {
    const animationControls = useAnimationControls();

    const [isMuted, setIsMuted] = React.useState(false);
    const [mouseEntered, setMouseEntered] = React.useState(false);
    const [xSpeed, setXSpeed] = React.useState(1);
    const [promptIndex, setPromptIndex] = React.useState(undefined);
    const [
        examplePromptHorizontalDisplacement,
        setExamplePromptHorizontalDisplacement,
    ] = React.useState(0);
    const [
        examplePromptVerticalDisplacement,
        setExamplePromptVerticalDisplacement,
    ] = React.useState(0);

    React.useEffect(() => {
        let interval;
        if (showExamplePrompts) {
            interval = setInterval(() => {
                // console.log(promptIndex);

                setPromptIndex(prev => {
                    const indices = examplePrompts
                        .map((_, i) => i)
                        .filter(i => i !== prev);
                    const randomIndex =
                        indices[Math.floor(Math.random() * indices.length)];

                    return randomIndex;
                });
                const radius = (size * 3) / 2;
                const angle = Math.random() * MAX_ANGLE;
                let horizontalDisplacement =
                    radius * Math.cos(degreesToRadians(angle));
                let verticalDisplacement =
                    radius * Math.sin(degreesToRadians(angle));
                horizontalDisplacement =
                    Math.random() > 0.5
                        ? horizontalDisplacement
                        : -horizontalDisplacement;
                verticalDisplacement =
                    Math.random() > 0.5
                        ? verticalDisplacement
                        : -verticalDisplacement;
                setExamplePromptHorizontalDisplacement(horizontalDisplacement);
                setExamplePromptVerticalDisplacement(verticalDisplacement);

                // console.log(size);
                // console.log(horizontalDisplacement);
                // console.log(verticalDisplacement);
            }, 5000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    React.useEffect(() => {
        let timeout;
        if (promptIndex !== undefined) {
            animationControls.start({
                opacity: 1,
            });
            timeout = setTimeout(() => {
                animationControls.start({
                    opacity: 0,
                });
            }, 3000);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [promptIndex]);

    // console.log(pulse);
    if (hasControls) {
        return (
            <ControlsContainer
                onMouseEnter={() => setMouseEntered(true)}
                onMouseLeave={() => setMouseEntered(false)}>
                <AvatarWrapper
                    size={size}
                    as={motion.div}
                    {...{ ...props, loading: undefined }}>
                    {rings}
                    <X
                        clickable
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        size={size}
                        transition={{ duration: 0.3 }}
                        initial={{ scale: 1 }}
                        onTap={() => {
                            // console.log("ok");
                            pulse();
                        }}
                        animate={controls}
                        onClick={() => {
                            if (paused()) {
                                play();
                            } else {
                                pause();
                            }
                        }}
                    />
                    <PromptContainer
                        promptIndex={promptIndex}
                        initial={{ opacity: 0 }}
                        animate={animationControls}
                        horizontalDisplacement={
                            examplePromptHorizontalDisplacement
                        }
                        verticalDisplacement={examplePromptVerticalDisplacement}
                        radius={(size * 3) / 2}>
                        {examplePrompts[promptIndex]}
                    </PromptContainer>
                </AvatarWrapper>
                <XControls
                    key="modal"
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    toggleMute={toggleMute}
                    setSpeed={setSpeed}
                    xSpeed={xSpeed}
                    setXSpeed={setXSpeed}
                    mouseEntered={mouseEntered}
                />
            </ControlsContainer>
        );
    }

    return (
        <AvatarWrapper size={size} as={motion.div} {...props}>
            {rings}
            <X
                size={size}
                transition={{ duration: 0.3 }}
                initial={{ scale: 1 }}
                animate={controls}
            />
        </AvatarWrapper>
    );
};

const PromptContainer = styled(motion.div)`
    ${({
        promptIndex,
        horizontalDisplacement,
        verticalDisplacement,
        radius,
    }) => css`
        ${promptIndex === undefined && "display: none;"}
        width: 400px;
        position: absolute;
        /* white-space: nowrap; */
        font-style: italic;
        font-size: 1.2rem;
        /* left: ${radius}px;
        z-index: 100000; */
        ${horizontalDisplacement > 0
            ? `left: ${radius + horizontalDisplacement}px;`
            : `right: ${radius - horizontalDisplacement}px;`}
        ${verticalDisplacement > 0
            ? `top: ${radius - verticalDisplacement}px;`
            : `bottom: ${radius + verticalDisplacement}px;`}

        ::before {
            content: '"';
        }

        ::after {
            content: '"';
        }
    `}
`;

const ControlsContainer = styled.div`
    position: relative;
    /* border: 5px solid red; */
`;

const X = styled(motion.div)`
    position: absolute;
    ${props => props.clickable && `cursor: pointer;`}
    border-radius: 50%;
    ${props => props.theme.gradient({ animationLength: 5, opacity: 0.75 })}
    backdrop-filter: blur(10px);
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    z-index: 1;
    border: 1px solid rgb(255, 255, 255, 0.05);
`;

const AvatarWrapper = styled(CenteredRow)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: ${props => props.size * 3}px;
    min-height: ${props => props.size * 3}px;
    /* border: 5px solid blue; */
`;

export default XAvatar;
