import styled, { css } from "styled-components";
import XControls from "./XControls";
import { motion, useAnimationControls } from "framer-motion";
import React from "react";
import CenteredRow from "@/components/common/layout/CenteredRow";
import { degreesToRadians } from "../../utils/misc";
import Pulse, { RING_PROPAGATION_DURATIONS } from "./Pulse";
import { EXAMPLE_PROMPTS } from "@/lib/constants";

const MAX_ANGLE = 40;

const ControlsContainer = styled.div`
    position: relative;
    /* border: 5px solid red; */
`;

const X = styled(motion.div)`
    position: absolute;
    ${props => props.clickable && `cursor: pointer;`}
    border-radius: 50%;
    ${props => props.theme.gradient({ animationLength: 5, opacity: 0.75 })}
    backdrop-filter: blur(0.625rem);
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
`;

/**
 * XAvatar - A React component for displaying an avatar with optional rings and controls.
 * It supports animations, pulsating rings, and interactive prompts.
 *
 * @param {Object} props - Properties to configure the avatar.
 * @param {number} props.size - Size of the avatar.
 * @param {number} [props.numRings=3] - Number of rings around the avatar.
 * @param {string} props.newEmotion - Emotion for the Pulse effect.
 * @param {function} props.toggleMute - Function to toggle mute state.
 * @param {function} props.paused - Function to check if paused.
 * @param {function} props.play - Function to start playing.
 * @param {function} props.pause - Function to pause.
 * @param {function} props.setSpeed - Function to set speed.
 * @param {boolean} props.showExamplePrompts - Flag to show example prompts.
 * @param {boolean} props.appear - Flag to control appearance animation.
 * @param {boolean} props.glow - Flag to enable/disable glow effect.
 * @param {object} props.controls - Animation controls for framer motion.
 * @param {function} props.onClick - Function to handle click events.
 * @param {boolean} props.hasControls - Flag to show/hide controls.
 * @returns {React.Component} A styled avatar component with interactive features.
 */
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
    appear,
    newEmotion,
    numRings = 3,
    glow,
    ...props
}) => {
    // console.log("NUM RINGS:", numRings);
    const animationControls = useAnimationControls();
    // const location = useLocation();

    const [isMuted, setIsMuted] = React.useState(false);
    const [mouseEntered, setMouseEntered] = React.useState(false);

    const [promptIndex, setPromptIndex] = React.useState(undefined);
    const [
        examplePromptHorizontalDisplacement,
        setExamplePromptHorizontalDisplacement,
    ] = React.useState(0);
    const [
        examplePromptVerticalDisplacement,
        setExamplePromptVerticalDisplacement,
    ] = React.useState(0);
    const [scale, setScale] = React.useState(0);

    // Effect for showing example prompts at intervals
    React.useEffect(() => {
        if (!showExamplePrompts) {
            return;
        }

        let interval;
        interval = setInterval(() => {
            // console.log(promptIndex);

            setPromptIndex(prev => {
                const indices = EXAMPLE_PROMPTS.map((_, i) => i).filter(
                    i => i !== prev
                );
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
        }, 5000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    // Effect for controlling the animation of prompts
    React.useEffect(() => {
        if (!showExamplePrompts) {
            return;
        }

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

    // Effect for the initial appearance animation
    React.useEffect(() => {
        async function animate() {
            if (appear) {
                // console.log("here");
                await controls.start({
                    scale: 1,
                    transition: {
                        type: "spring",
                        ease: "easeIn",
                        duration: 2,
                    },
                });
                setScale(1);
            }
        }

        animate();
    }, [appear]);

    // Main rendering logic, conditionally rendering rings, controls, and prompts
    if (hasControls) {
        return (
            <ControlsContainer
                onMouseEnter={() => setMouseEntered(true)}
                onMouseLeave={() => setMouseEntered(false)}>
                <AvatarWrapper
                    size={size}
                    as={motion.div}
                    {...{ ...props, loading: undefined }}>
                    {/* {rings} */}
                    {(!appear || scale === 1) &&
                        numRings &&
                        [...Array(numRings)].map((_, i) => (
                            <Pulse
                                newEmotion={newEmotion}
                                key={i}
                                size={size}
                                delay={
                                    // !!appear * 1.5 +
                                    (RING_PROPAGATION_DURATIONS[
                                        newEmotion || "neutral"
                                    ] /
                                        numRings) *
                                    i
                                }
                            />
                        ))}
                    <X
                        clickable
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        size={size}
                        transition={{ duration: 0.3 }}
                        onTap={() => {
                            // pulse();
                        }}
                        onClick={() => {
                            if (paused()) {
                                play();
                            } else {
                                pause();
                            }
                        }}
                        animate={controls}
                        style={{
                            scale: appear ? scale : 1,
                        }}

                        // {...(appear && appearAnimation)}
                    />
                    {showExamplePrompts && location.pathname === "/hub" && (
                        <PromptContainer
                            promptIndex={promptIndex}
                            initial={{ opacity: 0 }}
                            animate={animationControls}
                            horizontalDisplacement={
                                examplePromptHorizontalDisplacement
                            }
                            verticalDisplacement={
                                examplePromptVerticalDisplacement
                            }
                            radius={(size * 3) / 2}>
                            {EXAMPLE_PROMPTS[promptIndex]}
                        </PromptContainer>
                    )}
                </AvatarWrapper>
                <XControls
                    key="modal"
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    toggleMute={toggleMute}
                    setSpeed={setSpeed}
                    mouseEntered={mouseEntered}
                />
            </ControlsContainer>
        );
    }

    return (
        <AvatarWrapper size={size} as={motion.div} {...props}>
            {/* {rings} */}
            {(!appear || scale === 1) &&
                [...Array(numRings)].map((_, i) => (
                    <Pulse
                        newEmotion={newEmotion}
                        key={i}
                        // key={`${newEmotion}-${i}`}
                        size={size}
                        delay={
                            // !!appear * 1.5 +
                            (RING_PROPAGATION_DURATIONS[
                                newEmotion || "neutral"
                            ] /
                                numRings) *
                            i
                        }
                    />
                ))}
            <X
                size={size}
                transition={{ duration: 0.3 }}
                animate={controls}
                style={{
                    scale: appear ? scale : 1,
                }}
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
        width: 25rem;
        position: absolute;
        font-style: italic;
        font-size: 1.2rem;
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

export default XAvatar;
