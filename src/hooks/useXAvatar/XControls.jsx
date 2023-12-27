import { VolumeUp } from "@styled-icons/material-sharp/VolumeUp";
import { VolumeOff } from "@styled-icons/material-sharp/VolumeOff";
import { AnimatePresence, motion } from "framer-motion";
import IconButton from "@/components/common/input/IconButton/IconButton";
import styled from "styled-components";
import React from "react";
import SpeedChangerButton from "./SpeedChangerButton";

const SpeedButtonContainer = styled.div`
    position: absolute;
    width: fit-content;
    height: fit-content;
    top: 5px;
    left: 5px;
    z-index: 2;
`;

const MuteButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
`;

/**
 * XControls - A component for displaying and managing media controls such as volume and playback speed.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isMuted - Indicates whether the sound is muted.
 * @param {Function} props.setIsMuted - Function to set the mute state.
 * @param {Function} props.toggleMute - Function to toggle the mute state.
 * @param {Function} props.setSpeed - Function to set the playback speed.
 * @param {boolean} props.mouseEntered - Indicates whether the mouse has entered the control area.
 * @returns {React.Component} The component with media controls.
 */
function XControls({
    isMuted,
    setIsMuted,
    toggleMute,
    setSpeed,
    mouseEntered,
}) {
    const [xSpeed, setXSpeed] = React.useState(1);

    React.useEffect(() => {
        setSpeed(xSpeed);
    }, [xSpeed]);

    return (
        <AnimatePresence>
            {mouseEntered && (
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
                    <SpeedButtonContainer>
                        <SpeedChangerButton
                            speed={xSpeed}
                            setSpeed={setXSpeed}
                        />
                    </SpeedButtonContainer>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default XControls;
