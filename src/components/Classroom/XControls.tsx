import { motion } from "framer-motion";
import React from "react";
import IconButton from "../IconButton";
import { VolumeUp } from "@styled-icons/material-sharp/VolumeUp";
import { VolumeOff } from "@styled-icons/material-sharp/VolumeOff";

function XControls({ isMuted, setIsMuted, toggleMute }) {
    return (
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
            exit="hidden"
            style={{
                position: "absolute",
                top: "5px",
                right: "5px",
            }}>
            <IconButton
                style={{
                    width: "3em",
                    height: "3em",
                }}
                onClick={() => {
                    setIsMuted(!isMuted);
                    toggleMute();
                }}>
                {isMuted ? <VolumeOff size={30} /> : <VolumeUp size={30} />}
            </IconButton>
        </motion.div>
    );
}

export default XControls;
