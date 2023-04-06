export const gradientColour1 = "#58c1fe";
export const gradientColour2 = "rgba(36, 170, 255, 1)";
export const gradientColour3 = "rgba(1, 99, 255, 1)";
export const gradientAngle = 149;

const Theme = {
    colours: {
        primary: "#fff",
        primaryFaded: "rgba(255, 255, 255, 0.5)",
        primaryStrong: "rgb(255, 255, 255, 0.9)",
        secondary: gradientColour3,
        tertiary: "#040a1e",
        highlight1: "#3750c0",
        highlight2: "#217db0",
        glow: "#3523a9",
    },
    utils: {
        centeredRow: `
                    display: flex;
                    flex-direction: row;
                    justify-content: center;/
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
    gradient: ({ animationLength }: { length: number }) => `
    

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
    background: rgba(0, 0, 0, 0), linear-gradient(
        ${gradientAngle}  deg,
        ${gradientColour1}  0%,
        ${gradientColour2}  25%,
        ${gradientColour3}  75%,
        ${gradientColour1}  100%
    );
    background-clip: padding-box, border-box;
    background-size: 800% auto;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="${gradientColour1}",endColorstr="${gradientColour1}",GradientType=1);
    animation: gradient ${animationLength}s linear infinite;
    `,
    linearGradient: `
    linear-gradient(
        149deg,
        #58c1fe  0%,
        rgba(36, 170, 255, 1)  25%,
        rgba(1, 99, 255, 1)  75%,
        #58c1fe  100%
    )
    `,
};

export default Theme;
