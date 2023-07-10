import { VolumeUp } from "@styled-icons/material-sharp/VolumeUp";
import { VolumeOff } from "@styled-icons/material-sharp/VolumeOff";
import { AnimatePresence, motion } from "framer-motion";
import IconButton from "../../components/input/IconButton";
import styled from "styled-components";
import React from "react";
import Slider from "../../components/input/Slider";

function XControls({
    isMuted,
    setIsMuted,
    toggleMute,
    xSpeed,
    setXSpeed,
    setSpeed,
    mouseEntered,
}) {
    const [isDragging, setIsDragging] = React.useState(false);
    const [isHovering, setIsHovering] = React.useState(false);

    return (
        <AnimatePresence>
            {(mouseEntered || isDragging || isHovering) && (
                <motion.div
                    key="modal"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                        },
                    }}
                    exit="hidden">
                    <MuteButtonContainer>
                        <IconButton
                            style={{
                                width: "3rem",
                                height: "3rem",
                            }}
                            onClick={() => {
                                setIsMuted(!isMuted);
                                toggleMute();
                            }}>
                            {isMuted ? (
                                <VolumeOff size={30} />
                            ) : (
                                <VolumeUp size={30} />
                            )}
                        </IconButton>
                    </MuteButtonContainer>
                    <SpeedSliderContainer>
                        <Slider
                            min={1}
                            max={2}
                            step={0.25}
                            marks={[
                                { value: 1, label: "1x" },
                                { value: 1.25, label: "1.25x" },
                                { value: 1.5, label: "1.5x" },
                                { value: 1.75, label: "1.75x" },
                                { value: 2, label: "2x" },
                            ]}
                            value={xSpeed}
                            onChange={value => {
                                setXSpeed(value);
                                setSpeed(value);
                            }}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={() => setIsDragging(false)}
                            onMouseOver={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        />
                    </SpeedSliderContainer>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const SpeedSliderContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 1.25rem;
    width: 100%;
    z-index: 3;
`;

const MuteButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
`;

export default XControls;