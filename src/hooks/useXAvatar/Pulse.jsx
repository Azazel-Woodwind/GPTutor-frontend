import {
    animate,
    easeOut,
    motion,
    useAnimationControls,
    useMotionValue,
} from "framer-motion";
import styled from "styled-components";
import FillParent from "../../styles/containers/FillParent";
import React from "react";
import {
    RGBAarrToString,
    correctAnimation,
    interpolateArrays,
    inverseEaseOut,
    splitBezierAtT,
    splitRGBA,
} from "../../lib/misc";
import { EASE_OUT_BEZIER } from "../../lib/constants";

export const RING_PROPAGATION_DURATIONS = {
    excited: 2,
    happy: 3,
    neutral: 4,
};

const transition = ({ duration, ...opts } = {}) => ({
    duration: duration || RING_PROPAGATION_DURATIONS["neutral"],
    from: 1,
    ease: "easeOut",
    repeat: Infinity,
    repeatDelay: 0.01,
    ...opts,
});

const MAX_SCALE = 3;

const ANIMATIONS = {
    neutral: {
        scale: MAX_SCALE,
        boxShadow: [
            "0 0 0 2px rgba(52, 65, 97, 0.5)",
            "0 0 0 1px rgba(52, 65, 97, 0.8)",
            "0 0 0 1px rgba(52, 65, 97, 0)",
        ],
        backgroundColor: [
            "rgba(255, 255, 255, 0.05)",
            "rgba(255, 255, 255, 0.05)",
            "rgba(255, 255, 255, 0)",
        ],
    },
    happy: {
        scale: MAX_SCALE,
        boxShadow: [
            "0 0 0 2px rgba(52, 65, 97, 0.8)",
            "0 0 0 1px rgba(52, 65, 97, 0.8)",
            "0 0 0 1px rgba(52, 65, 97, 0)",
        ],
        backgroundColor: [
            "rgba(255, 255, 255, 0.1)",
            "rgba(255, 255, 255, 0.05)",
            "rgba(255, 255, 255, 0)",
        ],
    },
    excited: {
        scale: MAX_SCALE,
        boxShadow: [
            "0 0 1px 3px rgba(77, 94, 137, 0.5)",
            "0 0 1px 2px rgba(77, 94, 137, 0.8)",
            "0 0 1px 1px rgba(77, 94, 137, 0)",
        ],
        backgroundColor: [
            "rgba(255, 255, 255, 0.1)",
            "rgba(255, 255, 255, 0.1)",
            "rgba(255, 255, 255, 0.0)",
        ],
    },
};

function Pulse({ size, delay, newEmotion }) {
    const currentEmotion = React.useRef("neutral");
    const animatingTimeBuffer = React.useRef(0);
    const started = React.useRef(false);
    const startTime = React.useRef(null);
    const timer = React.useRef(null);

    const scale = useMotionValue(1);

    const controls = useAnimationControls();

    // L code (this does not represent xtutor or associates)
    // all code here was written by none other than LOIC CUNNINGHAM +44 7862 658907 @zedd_grayhem on twitter also commonly known as "Little Bitch"
    // ALL COMPLAINTS ABOUT THIS CODE TO kaistrachan@gmail.com (17.14lat,12.04) (queens road london 17 flat 3) 280307524874403840 (xoxo call me) (into dominant men and women)
    React.useEffect(() => {
        // console.log(controls.animation.time);
        controls.start(ANIMATIONS[currentEmotion.current]);
        timer.current = setTimeout(() => {
            // console.log("DELAY DONE");
            controls.start(
                ANIMATIONS[currentEmotion.current],
                transition({
                    duration:
                        RING_PROPAGATION_DURATIONS[currentEmotion.current],
                })
            );
            started.current = true;
        }, delay * 1000);
        startTime.current = performance.now();

        return () => clearTimeout(timer.current);

        // controls.start(ANIMATIONS[currentEmotion.current], {
        //     ...transition({
        //         duration: RING_PROPAGATION_DURATIONS[currentEmotion.current],
        //         delay,
        //     }),
        // });

        // controls.start(ANIMATIONS[currentEmotion.current]);
    }, []);

    const handleEmotionChange = async newEmotion => {
        if (!started.current) {
            const timeElapsed = performance.now() - startTime.current;
            const timeLeft = delay * 1000 - timeElapsed;

            if (timer.current) clearTimeout(timer.current);

            timer.current = setTimeout(() => {
                // console.log("DELAY DONE");
                controls.start(
                    ANIMATIONS[newEmotion],
                    transition({
                        duration: RING_PROPAGATION_DURATIONS[newEmotion],
                    })
                );
                started.current = true;
            }, (RING_PROPAGATION_DURATIONS[newEmotion] / RING_PROPAGATION_DURATIONS[currentEmotion.current]) * timeLeft);
            startTime.current = performance.now();

            currentEmotion.current = newEmotion;
            return;
        }

        // console.log("FOUND SPLIT BEZIER")
        // console.log(animatingTimeBuffer.current);
        const animatingTime =
            scale.animation.time + animatingTimeBuffer.current;
        const relativeAnimationTime =
            animatingTime % RING_PROPAGATION_DURATIONS[currentEmotion.current];
        const t =
            relativeAnimationTime /
            RING_PROPAGATION_DURATIONS[currentEmotion.current];
        const newEasing = splitBezierAtT(...EASE_OUT_BEZIER, t);

        const remainingTime = (1 - t) * RING_PROPAGATION_DURATIONS[newEmotion];

        currentEmotion.current = newEmotion;
        animatingTimeBuffer.current +=
            t * RING_PROPAGATION_DURATIONS[newEmotion];

        const { animation, times } = correctAnimation(
            ANIMATIONS[currentEmotion.current],
            t,
            currentEmotion.current
        );
        // console.log("T:", t);
        // console.log("ANIMATION", animation);
        await controls.start(animation, {
            duration: remainingTime,
            ease: newEasing,
            ...(times && { times }),
        });

        if (currentEmotion.current !== newEmotion) return;
        // console.log("END INITIAL EXCITED ANIMATION");
        animatingTimeBuffer.current = 0;
        controls.start(ANIMATIONS[newEmotion], {
            ...transition({
                duration: RING_PROPAGATION_DURATIONS[newEmotion],
                delay: 0.01,
            }),
        });
    };

    React.useEffect(() => {
        if (!newEmotion) return;
        console.log("emotion", newEmotion);

        handleEmotionChange(newEmotion);
    }, [newEmotion]);

    // console.log(delay);
    return (
        <Ring
            style={{
                scale,
            }}
            as={motion.div}
            size={size}
            animate={controls}
            onAnimationStart={() => {
                // console.log("ANIMATION STARTED");
            }}
            // animate={animation}
            transition={transition({ delay })}
        />
    );
}

const Ring = styled(FillParent)`
    position: absolute;
    border-radius: 50%;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    z-index: 1;
`;

export default Pulse;
