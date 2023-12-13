import {
    animate,
    easeOut,
    motion,
    useAnimationControls,
    useMotionValue,
} from "framer-motion";
import styled from "styled-components";
import FillParent from "../../components/common/layout/FillParent";
import React from "react";
import { EASE_OUT_BEZIER } from "../../lib/constants";
import { correctAnimation, splitBezierAtT } from "@/lib/animation";

export const RING_PROPAGATION_DURATIONS = {
    excited: 1,
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
            "0 0 0 2px rgba(52, 65, 97, 0.1)",
            "0 0 0 1px rgba(52, 65, 97, 0.8)",
            "0 0 0 1px rgba(52, 65, 97, 0)",
        ],
        backgroundColor: [
            "rgba(255, 255, 255, 0.5)",
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
            "rgba(255, 255, 255, 0.5)",
            "rgba(255, 255, 255, 0.1)",
            "rgba(255, 255, 255, 0.0)",
        ],
    },
};

function Pulse({ size, delay, newEmotion }) {
    const currentEmotion = React.useRef(newEmotion || "neutral");
    const animatingTimeBuffer = React.useRef(0);
    const started = React.useRef(false);
    const startTime = React.useRef(null);
    const currentDelay = React.useRef(delay);

    const scale = useMotionValue(1);

    // React.useEffect(
    //     () =>
    //         scale.on("change", latest => {
    //             console.log(scale.animation?.time);
    //         }),
    //     []
    // );

    const controls = useAnimationControls();

    const handleEmotionChange = async newEmotion => {
        if (scale?.animation?.time === undefined) {
            controls.start(
                ANIMATIONS[currentEmotion.current],
                transition({
                    duration:
                        RING_PROPAGATION_DURATIONS[currentEmotion.current],
                    delay,
                })
            );
            startTime.current = performance.now();
            return;
        }

        if (
            !started.current &&
            performance.now() - startTime.current < currentDelay.current * 1000
        ) {
            // console.log("HERE");
            const elapsedTime = performance.now() - startTime.current;
            const timeLeft = currentDelay.current - elapsedTime / 1000;
            const newTimeLeft =
                (RING_PROPAGATION_DURATIONS[newEmotion] /
                    RING_PROPAGATION_DURATIONS[currentEmotion.current]) *
                timeLeft;
            currentEmotion.current = newEmotion;
            currentDelay.current = elapsedTime / 1000 + newTimeLeft;
            controls.start(
                ANIMATIONS[currentEmotion.current],
                transition({
                    duration:
                        RING_PROPAGATION_DURATIONS[currentEmotion.current],
                    delay: newTimeLeft,
                })
            );
            return;
        }
        // console.log("NO HERE");

        started.current = true;

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
        controls.start(
            ANIMATIONS[newEmotion],
            transition({
                duration: RING_PROPAGATION_DURATIONS[newEmotion],
                delay: 0.01,
            })
        );
    };

    React.useEffect(() => {
        if (!newEmotion) {
            newEmotion = "neutral";
        }
        // console.log("emotion", newEmotion);

        handleEmotionChange(newEmotion);
    }, [newEmotion]);

    // L code (this does not represent xtutor or associates)
    // all code here was written by none other than LOIC CUNNINGHAM +44 7862 658907 @zedd_grayhem on twitter also commonly known as "Little Bitch"
    // ALL COMPLAINTS ABOUT THIS CODE TO kaistrachan@gmail.com (17.14lat,12.04) (queens road london 17 flat 3) 280307524874403840 (xoxo call me) (into dominant men and women)
    React.useEffect(() => {
        // console.log("DELAY:", delay);
        return () => {
            // console.log("UNMOUNTING");
            controls.stop();
        };
    }, []);

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
                startTime.current = performance.now();
            }}
            // animate={animation}
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
