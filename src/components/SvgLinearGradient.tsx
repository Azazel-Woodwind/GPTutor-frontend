import React from "react";

function SvgLinearGradient({ gradientID }) {
    return (
        <linearGradient
            id={gradientID}
            // id="gradient"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%">
            <stop offset="0%" stopColor="#58c1fe">
                <animate
                    attributeName="stop-color"
                    values="#58c1fe; #0163ff; #0163ff; #58c1fe"
                    dur="4s"
                    repeatCount="indefinite"></animate>
            </stop>
            <stop offset="33%" stopColor="#0163ff">
                <animate
                    attributeName="stop-color"
                    values=" #0163ff; #0163ff; #58c1fe; #58c1fe;"
                    dur="4s"
                    repeatCount="indefinite"></animate>
            </stop>
            <stop offset="67%" stopColor="#0163ff">
                <animate
                    attributeName="stop-color"
                    values="#0163ff; #0163ff; #58c1fe; #58c1fe;"
                    dur="4s"
                    repeatCount="indefinite"></animate>
            </stop>
            <stop offset="100%" stopColor="#58c1fe">
                <animate
                    attributeName="stop-color"
                    values="#58c1fe; #0163ff; #0163ff; #58c1fe"
                    dur="4s"
                    repeatCount="indefinite"></animate>
            </stop>
        </linearGradient>
    );
}

export default SvgLinearGradient;
