import React from "react";
import styled from "styled-components";
import CenteredColumn from "../styles/containers/CenteredColumn";
import CenteredRow from "../styles/containers/CenteredRow";
import FillParent from "../styles/containers/FillParent";

import { motion, useAnimation } from "framer-motion";

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
    opacity: [0, 1, 1],
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

const useAvatar = ({
    size = 100,
    ringCount = 3,
    duration = 4,
    hasLogo,
}: {}) => {
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
    controls,
    clickable,
    onClick,
    XProps,
    ...props
}) => {
    return (
        <AvatarWrapper size={size} as={motion.div} {...props}>
            {rings}
            <X
                clickable={clickable}
                {...(clickable && {
                    whileHover: { scale: 1.1 },
                    whileTap: { scale: 0.95 },
                    onClick,
                })}
                size={size}
                transition={{ duration: 0.3 }}
                initial={{ scale: 1 }}
                animate={controls}
                {...XProps}
            />
        </AvatarWrapper>
    );
};

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
    background-color: #344161;
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
