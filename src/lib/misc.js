import { easeOut } from "framer-motion";
import { EASE_OUT_BEZIER } from "./constants";

export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

export function interpolateColor(percentage, hex1, hex2) {
    const rgb1 = hexToRGB(hex1);
    const rgb2 = hexToRGB(hex2);
    const r = Math.round(rgb1[0] + percentage * (rgb2[0] - rgb1[0]));
    const g = Math.round(rgb1[1] + percentage * (rgb2[1] - rgb1[1]));
    const b = Math.round(rgb1[2] + percentage * (rgb2[2] - rgb1[2]));
    return `rgb(${r}, ${g}, ${b})`;
}

export function splitBezierAtT(p0, p1, p2, p3, t) {
    let q0 = (1 - t) * p0 + t * p1;
    let q1 = (1 - t) * p1 + t * p2;
    let q2 = (1 - t) * p2 + t * p3;

    let r0 = (1 - t) * q0 + t * q1;
    let r1 = (1 - t) * q1 + t * q2;

    let s = (1 - t) * r0 + t * r1;

    return [s, r1, q2, p3];
}

// export function inverseEaseOut(
//     x,
//     epsilon = 1e-6,
//     iterations = 30
// ) {
//     let t = 0.5,
//         delta;
//     for (let i = 0; i < iterations; i++) {
//         delta = easeOut(t) - x;
//         if (Math.abs(delta) < epsilon) break;
//         t -= delta / (3 * Math.pow(1 - t, 2) - 3 * Math.pow(t, 2) + 1);
//     }
//     return t;
// }

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

export function splitRGBA(rgba) {
    const [r, g, b, a] = rgba
        .split("rgba")[1]
        .slice(1, -1)
        .split(",")
        .map(num => parseFloat(num));
    return [r, g, b, a];
}

export function RGBAarrToString(rgba) {
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}

export function interpolateArrays(array1, array2, factor) {
    if (array1.length !== array2.length) return null;

    return array1.map((val, i) => val + (array2[i] - val) * factor);
}

export function correctAnimation(animation, progress, emotion) {
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
