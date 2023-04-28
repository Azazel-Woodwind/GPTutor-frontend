// export const gradientColour1 = "#00beff";
// export const gradientColour2 = "#0000ff";
// export const gradientColour3 = "#005eff";
// export const gradientColour4 = "#00beff";
// export const gradientColour1 = "#32b4ff";
// export const gradientColour2 = "#24aaff";
// export const gradientColour3 = "#0163ff";
// export const gradientColour4 = "#32b4ff";
export const gradientColour1 = "#34b5ff";
export const gradientColour2 = "#24aaff";
export const gradientColour3 = "#0163ff";
export const gradientColour4 = "#34b5ff";
export const gradientAngle = 45;

//make your fucking svg shit use the actual theme

const Theme = {
    colours: {
        background: "#0C1437",
        primary: "#ffffff",
        primaryFaded: "rgba(255, 255, 255, 0.5)",
        primaryStrong: "rgba(255, 255, 255, 0.9)",
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
    contrastGradient: `
        background: rgb(63,94,251);
        background: -moz-radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        background: -webkit-radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3f5efb",endColorstr="#fc466b",GradientType=1); 
    `,
    gradient: ({ animationLength = 5 }: { animationLength: number }) => `
    

    background: ${gradientColour1};
    background: linear-gradient(
        ${gradientAngle}deg, 
        ${gradientColour1} 0%, 
        ${gradientColour3} 33%, 
        ${gradientColour3} 67%, 
        ${gradientColour4} 100%);

    background-size: 200% 200%;
    background-position: 0% 100%;
    animation: gradient ${animationLength}s ease-in-out infinite;
    animation-direction: alternate;
    `,
    gradientFaded: ({ animationLength }: { length: number }) => `
    background: ${gradientColour1};
    background: linear-gradient(
        ${gradientAngle}deg, 
        ${gradientColour1}95 0%, 
        ${gradientColour3}95 33%, 
        ${gradientColour3}95 67%, 
        ${gradientColour4}95 100%);

    background-size: 200% 200%;
    background-position: 0% 100%;
    animation: gradient ${animationLength}s ease-in-out infinite;
    animation-direction: alternate;
    `,
    linearGradient: `linear-gradient(
        ${gradientAngle}  deg,
        ${gradientColour1}  0%,
        ${gradientColour2}  25%,
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
