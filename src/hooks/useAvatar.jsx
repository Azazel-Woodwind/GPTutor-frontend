import React from "react";
import styled, { css } from "styled-components";
import CenteredColumn from "../styles/containers/CenteredColumn";
import CenteredRow from "../styles/containers/CenteredRow";
import FillParent from "../styles/containers/FillParent";
import { VolumeUp } from "@styled-icons/material-sharp/VolumeUp";
import { VolumeOff } from "@styled-icons/material-sharp/VolumeOff";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import IconButton from "../components/IconButton";
import Slider from "../components/Slider";

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
    setSpeed,
    ...props
}) => {
    const [isMuted, setIsMuted] = React.useState(false);
    const [mouseEntered, setMouseEntered] = React.useState(false);
    const [xSpeed, setXSpeed] = React.useState(1);

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
                                width: "3em",
                                height: "3em",
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
                            min={0.5}
                            max={3}
                            step={0.1}
                            marks={[
                                { value: 0.5, label: "0.5x" },
                                { value: 1, label: "1x" },
                                { value: 1.5, label: "1.5x" },
                                { value: 2, label: "2x" },
                                { value: 2.5, label: "2.5x" },
                                { value: 3, label: "3x" },
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
    bottom: 20px;
    width: 100%;
    z-index: 3;
`;

const MuteButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
`;

const ControlsContainer = styled.div`
    position: relative;
    /* border: 5px solid red; */
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
