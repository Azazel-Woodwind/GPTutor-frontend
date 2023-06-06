// export const gradientColour1 = "#34b5ff";
// export const gradientColour2 = "#24aaff";
// export const gradientColour3 = "#0163ff";
// export const gradientColour4 = "#34b5ff";
import converter from "hex2dec";

export const gradientColour1 = "#0163ff";
export const gradientColour2 = "#0163ff";
export const gradientColour3 = "#00b6ff";
export const gradientColour4 = "#00b6ff";
export const gradientColour5 = "#0163ff";
export const gradientColour6 = "#0163ff";
export const gradientAngle = 45;

const Theme = {
    colours: {
        background: "#0C1437",
        // background: "#dfd9d9",
        primary: "#ffffff",
        primaryFaded: "rgba(255, 255, 255, 0.5)",
        primaryStrong: "rgba(255, 255, 255, 0.9)",
        secondary: gradientColour1,
        tertiary: "#040a1e",
        contrast: "#E323F0",
        highlight1: "#1D1054",
        highlight2: gradientColour3,
        glow: "#3523a9",
        error: "#ff5252",
    },
    font: {
        small: "12px",
        medium: "16px",
        large: "20px",
        xlarge: "24px",
    },
    utils: {
        centeredRow: `
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                `,
        centeredColumn: `
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                `,
        absoluteCentered: `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                `,
        fillParent: `
                    height: 100%;
                    width: 100%;
        `,
        fullScreen: `
                    height: 100vh;
                    width: 100vw;
                    `,
    },
    contrastGradient: `
        background: rgb(63,94,251);
        background: -moz-radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        background: -webkit-radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3f5efb",endColorstr="#fc466b",GradientType=1); 
    `,
    gradient: ({ animationLength = 5, opacity = 1 } = {}) => {
        opacity = converter.decToHex(`${Math.round(opacity * 255)}`, {
            prefix: false,
        });
        return `
    background: ${gradientColour1}${opacity};
    background: -moz-linear-gradient(
        ${gradientAngle}deg,
        ${gradientColour1}${opacity} 0%,
        ${gradientColour2}${opacity} 20%,
        ${gradientColour3}${opacity} 45%,
        ${gradientColour4}${opacity} 55%,
        ${gradientColour5}${opacity} 80%,
        ${gradientColour6}${opacity} 100%
    );
    background: -webkit-linear-gradient(
        ${gradientAngle}deg,
        ${gradientColour1}${opacity} 0%,
        ${gradientColour2}${opacity} 20%,
        ${gradientColour3}${opacity} 45%,
        ${gradientColour4}${opacity} 55%,
        ${gradientColour5}${opacity} 80%,
        ${gradientColour6}${opacity} 100%
    );
    background: linear-gradient(
        ${gradientAngle}deg,
        ${gradientColour1}${opacity} 0%,
        ${gradientColour2}${opacity} 20%,
        ${gradientColour3}${opacity} 45%,
        ${gradientColour4}${opacity} 55%,
        ${gradientColour5}${opacity} 80%,
        ${gradientColour6}${opacity} 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=${gradientColour1}${opacity},endColorstr=${gradientColour1}${opacity},GradientType=1);

    background-size: 200% 200%;
    background-position: 0% 100%;
    animation: gradient ${animationLength}s ease-in-out infinite;
    animation-direction: alternate;
    `;
    },
};

Theme.utils["gradientText"] = `
    ${Theme.gradient({ animationLength: 5 })}
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export default Theme;
