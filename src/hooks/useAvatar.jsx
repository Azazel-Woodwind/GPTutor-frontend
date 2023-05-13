import React from "react";
import styled from "styled-components";
import CenteredColumn from "../styles/containers/CenteredColumn";
import CenteredRow from "../styles/containers/CenteredRow";
import FillParent from "../styles/containers/FillParent";
import { VolumeUp } from "@styled-icons/material-sharp/VolumeUp";
import { VolumeOff } from "@styled-icons/material-sharp/VolumeOff";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import IconButton from "../components/IconButton";

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
    const controls = useAnimation();
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

const useAvatar = ({ size = 100, ringCount = 3, duration = 4, hasLogo }) => {
    const [rings, setRings] = React.useState([]);
    const [isPulsing, setIsPulsing] = React.useState(true);
    const controls = useAnimation();

    const pulse = () => {
        setRings(prev => {
            prev.push(
                <Pulse key={Date.now()} size={size} setRings={setRings} />
            );
            return [...prev];
        });
    };

    const pulseX = scale => {
        // console.log("pulseX", scale);

        controls.start({
            scale: scale || 1,
            transition: {
                duration: 0.03,
            },
        });
    };

    React.useEffect(() => {
        // console.log("mounting");
        const intervalDuration = (duration / ringCount) * 1000;
        const interval = setInterval(() => {
            if (isPulsing) pulse();
        }, intervalDuration);

        pulse();
        return () => {
            // console.log("unmounting");
            clearInterval(interval);
        };
    }, []);

    return {
        Avatar,
        avatarProps: {
            size,
            controls,
            rings,
            pulse,
        },
        pulse,
        pulseX,
        isPulsing,
        setIsPulsing,
    };
};

const Avatar = ({
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
    ...props
}) => {
    const [isMuted, setIsMuted] = React.useState(false);
    const [showControls, setShowControls] = React.useState(false);

    // console.log(pulse);
    if (hasControls) {
        return (
            <ControlsContainer
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}>
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
                </AvatarWrapper>
                <AnimatePresence>
                    {showControls && (
                        <XControls
                            isMuted={isMuted}
                            setIsMuted={setIsMuted}
                            toggleMute={toggleMute}
                        />
                    )}
                </AnimatePresence>
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

const ControlsContainer = styled.div`
    position: relative;
`;

const Ring = styled(FillParent)`
    position: absolute;
    border-radius: 50%;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    z-index: 1;
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

export default useAvatar;
