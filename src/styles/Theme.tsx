export const gradientColour1 = "#58c1fe";
export const gradientColour2 = "#24aaff";
export const gradientColour3 = "#0163ff";
export const gradientAngle = 149;

const Theme = {
    colours: {
        background: "#0C1437",
        primary: "#ffffff",
        primaryFaded: "rgba(255, 255, 255, 0.5)",
        primaryStrong: "rgb(255, 255, 255, 0.9)",
        secondary: gradientColour3,
        tertiary: "#040a1e",
        contrast: "#E323F0",
        highlight1: "#1D1054",
        highlight2: "#2B91FF",
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
    gradient: ({ animationLength = 5 }: { animationLength: number }) => `
    

    background: ${gradientColour1};
    background: -moz-linear-gradient(
        ${gradientAngle}deg,
        ${gradientColour1} 0%,
        ${gradientColour2} 25%,
        ${gradientColour3} 75%,
        ${gradientColour1} 100%
    );
    
    background: -webkit-linear-gradient(
        ${gradientAngle}deg,
        ${gradientColour1}  0%,
        ${gradientColour2}  25%,
        ${gradientColour3}  75%,
        ${gradientColour1}  100%
    );
    background: linear-gradient(
        ${gradientAngle}  deg,
        ${gradientColour1}  0%,
        ${gradientColour2}  25%,
        ${gradientColour3}  75%,
        ${gradientColour1}  100%
    );
    background-size: 800% auto;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="${gradientColour1}",endColorstr="${gradientColour1}",GradientType=1);
    animation: gradient ${animationLength}s linear infinite;
    `,
    gradientFaded: ({ animationLength }: { length: number }) => `
    

    background: ${gradientColour1};
    background: -moz-linear-gradient(
        ${gradientAngle}deg,
        ${gradientColour1}90 0%,
        ${gradientColour2}90 25%,
        ${gradientColour3}90 75%,
        ${gradientColour1}90 100%
    );
    
    background: -webkit-linear-gradient(
        ${gradientAngle}deg,
        ${gradientColour1}90  0%,
        ${gradientColour2}90  25%,
        ${gradientColour3}90  75%,
        ${gradientColour1}90  100%
    );
    background: linear-gradient(
        ${gradientAngle}  deg,
        ${gradientColour1}90  0%,
        ${gradientColour2}90  25%,
        ${gradientColour3}90  75%,
        ${gradientColour1}70  100%
    );
    background-size: 800% auto;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="${gradientColour1}",endColorstr="${gradientColour1}",GradientType=1);
    animation: gradient ${animationLength}s linear infinite;
    `,
    linearGradient: `linear-gradient(
        ${gradientAngle}  deg,
        ${gradientColour1}  0%,
        ${gradientColour2}  25%,
        ${gradientColour3}  75%,
        ${gradientColour1}  100%
    );
    `,
};

Theme.utils["gradientText"] = `
    ${Theme.gradient({ animationLength: 5 })}
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export default Theme;
