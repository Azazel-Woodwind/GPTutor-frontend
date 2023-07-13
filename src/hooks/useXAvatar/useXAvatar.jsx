import React from "react";
import { useAnimation, useAnimationControls } from "framer-motion";
import XAvatar from "./XAvatar";
import Pulse from "./Pulse";

const useXAvatar = ({ size = 100, ringCount = 3, duration = 4, appear }) => {
    const [rings, setRings] = React.useState([]);
    const [isPulsing, setIsPulsing] = React.useState(true);
    const controls = useAnimationControls();

    const pulse = () => {
        setRings(prev => {
            prev.push(
                <Pulse
                    key={Date.now()}
                    size={size}
                    setRings={setRings}
                    duration={duration}
                />
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
        let interval;
        const intervalDuration = (duration / ringCount) * 1000;
        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                if (isPulsing) pulse();
            }, intervalDuration);

            pulse();
        }, !!appear * 1500);

        return () => {
            // console.log("unmounting");
            clearInterval(interval);
            clearTimeout(timeout);
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
