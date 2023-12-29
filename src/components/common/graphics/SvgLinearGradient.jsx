import React from "react";

const EASE_IN_OUT_KEYFRAMES = {
    keyTimes: "0; 0.5; 1",
    keySplines: "0.42 0 0.58 1; 0.42 0 0.58 1",
    calcMode: "spline",
}; // do NOT change any of these numbers, they are very carefully calculated

/**
 * SvgLinearGradient - A component for creating a linear gradient within an SVG element.
 * It includes predefined color stops and animations to create a dynamic visual effect.
 * The gradient animation uses carefully calculated ease-in-out keyframes.
 *
 * @param {Object} props - The component props.
 * @param {string} props.gradientID - The unique identifier for the gradient, used in the 'id' attribute.
 * @returns {React.Component} A linearGradient SVG element with predefined color stops and animations.
 */
function SvgLinearGradient({ gradientID }) {
    return (
        <linearGradient
            id={gradientID}
            x1="0%"
            y1="100%"
            x2="200%"
            y2="-100%"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0163ff" />
            <stop offset="20%" stopColor="#0163ff" />
            <stop offset="45%" stopColor="#00b6ff" />
            <stop offset="55%" stopColor="#00b6ff" />
            <stop offset="80%" stopColor="#0163ff" />
            <stop offset="100%" stopColor="#0163ff" />
            <animate
                attributeName="x1"
                values="0%; -100%; 0%"
                dur="10s"
                repeatCount="indefinite"
                {...EASE_IN_OUT_KEYFRAMES}
            />
            <animate
                attributeName="x2"
                values="200%; 100%; 200%"
                dur="10s"
                repeatCount="indefinite"
                {...EASE_IN_OUT_KEYFRAMES}
            />
            <animate
                attributeName="y1"
                values="100%; 200%; 100%"
                dur="10s"
                repeatCount="indefinite"
                {...EASE_IN_OUT_KEYFRAMES}
            />
            <animate
                attributeName="y2"
                values="-100%; 0%; -100%"
                dur="10s"
                repeatCount="indefinite"
                {...EASE_IN_OUT_KEYFRAMES}
            />
        </linearGradient>
    );
}

export default SvgLinearGradient;
