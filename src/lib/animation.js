//If we're going to reuse animations a massive amount define them here

import { RGBAarrToString, splitRGBA } from "@/utils/css";
import { interpolateArrays } from "@/utils/misc";

export const fade_animation = ({ delayed = false } = {}) => ({
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
    },
    transition: {
        duration: 0.5,
        delay: delayed ? 0.5 : 0,
    },
});

export const fade_exit = { opacity: 0, transition: { duration: 0.5 } };

export function splitBezierAtT(p0, p1, p2, p3, t) {
    let q0 = (1 - t) * p0 + t * p1;
    let q1 = (1 - t) * p1 + t * p2;
    let q2 = (1 - t) * p2 + t * p3;

    let r0 = (1 - t) * q0 + t * q1;
    let r1 = (1 - t) * q1 + t * q2;

    let s = (1 - t) * r0 + t * r1;

    return [s, r1, q2, p3];
}

export function inverseEaseOut(x, epsilon = 1e-6) {
    let lower = 0,
        upper = 1,
        guess;

    while (upper - lower > epsilon) {
        guess = (upper + lower) / 2;
        if (easeOut(guess) < x) {
            lower = guess;
        } else {
            upper = guess;
        }
    }

    return (upper + lower) / 2;
}

export function correctAnimation(animation, progress) {
    if (!animation) return;
    let boxShadow = animation.boxShadow;
    let backgroundColor = animation.backgroundColor;
    if (progress >= 0.5) {
        boxShadow = boxShadow.slice(1);
        backgroundColor = backgroundColor.slice(1);
        progress -= 0.5;
    }

    boxShadow = boxShadow.map((shadow, i) => {
        if (i === 0) {
            const rgba1 = splitRGBA(shadow);
            const rgba2 = splitRGBA(boxShadow[1]);
            const newRgba = interpolateArrays(rgba1, rgba2, progress);
            return shadow.split("rgba")[0] + RGBAarrToString(newRgba);
        }
        return shadow;
    });

    backgroundColor = backgroundColor.map((color, i) => {
        if (i === 0) {
            const rgba1 = splitRGBA(color);
            const rgba2 = splitRGBA(backgroundColor[1]);
            const newRgba = interpolateArrays(rgba1, rgba2, progress);
            return RGBAarrToString(newRgba);
        }
        return color;
    });

    const result = {
        animation: {
            ...animation,
            boxShadow,
            backgroundColor,
        },
    };

    if (progress < 0.5) {
        result.times = [0, 0.5 - progress, 1];
    }

    return result;
}
