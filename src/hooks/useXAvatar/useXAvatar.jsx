import React from "react";
import { useAnimation } from "framer-motion";
import XAvatar from "./XAvatar";
import Pulse from "./Pulse";

const useXAvatar = ({ size = 100, ringCount = 3, duration = 4, hasLogo }) => {
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
        XAvatar,
        XAvatarProps: {
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

export default useXAvatar;
