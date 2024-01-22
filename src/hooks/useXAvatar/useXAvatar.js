import React from "react";
import { useAnimationControls } from "framer-motion";
import XAvatar from "./X";
import Pulse from "./Pulse";

const useXAvatar = ({ size = 100 }) => {
    const [rings, setRings] = React.useState([]);
    const [isPulsing, setIsPulsing] = React.useState(true);
    const controls = useAnimationControls();

    // TODO: implement this
    const pulse = () => {
        // setRings(prev => {
        //     prev.push(
        //         <Pulse
        //             key={Date.now()}
        //             size={size}
        //             setRings={setRings}
        //             duration={duration}
        //         />
        //     );
        //     return [...prev];
        // });
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
