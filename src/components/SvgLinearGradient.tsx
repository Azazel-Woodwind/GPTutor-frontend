import React from "react";

function SvgLinearGradient({ gradientID }) {
    return (
        <linearGradient
            id={gradientID}
            // id="gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#58c1fe" />
            <stop offset="25%" stopColor="rgba(36, 170, 255, 1)" />
            <stop offset="75%" stopColor="rgba(1, 99, 255, 1)" />
            <stop offset="100%" stopColor="#58c1fe" />
            <animate
                attributeName="x1"
                from="0"
                to="100%"
                dur="5s"
                repeatCount="indefinite"
            />
            <animate
                attributeName="x2"
                from="100%"
                to="200%"
                dur="5s"
                repeatCount="indefinite"
            />
        </linearGradient>
    );
}

export default SvgLinearGradient;
