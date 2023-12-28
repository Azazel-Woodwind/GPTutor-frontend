import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import {
    CheckSvgData,
    CrossSvgData,
    ErrorSvgData,
    InfoSvgData,
} from "@/lib/svgIconData";
import SVGIcon from "@/components/common/graphics/SVGIcon";
import Theme from "@/styles/Theme";
import {
    Container,
    ContentContainer,
    CrossSvg,
    InnerContentContainer,
    LabelContainer,
    ProgressContainer,
} from "./Notification.styles";

const TYPES_TO_ICON_DATA = {
    info: <SVGIcon svgData={InfoSvgData} fill="white" size={24} />,
    error: <SVGIcon svgData={ErrorSvgData} fill="white" size={27} />,
    success: <SVGIcon svgData={CheckSvgData} fill="white" size={30} />,
};

export const TYPES_TO_COLOUR = {
    info: Theme.colours.glow,
    error: Theme.colours.error,
    success: "transparent",
};

/**
 * Notification - A component for displaying notifications with various types (info, error, success).
 * It features a progress bar, optional click handling, and animation controls.
 *
 * @param {Object} props - The component props.
 * @param {number} [props.duration=5] - Duration in seconds before the notification disappears.
 * @param {Function} [props.onClick] - Function to handle click events on the notification.
 * @param {string} [props.label="Submit to your master"] - The text content of the notification.
 * @param {boolean} [props.destroyOnClick=true] - If true, the notification will disappear when clicked.
 * @param {string} [props.type="info"] - Type of notification which can be 'info', 'error', or 'success'.
 * @param {Function} [props.onEnd] - Function called when the notification disappears after completing its duration.
 * @returns {React.Component} A notification component with customizable types and behavior.
 */
function Notification({
    duration = 5,
    onClick = () => {},
    label = "Submit to your master",
    destroyOnClick = true,
    type = "info",
    onEnd = () => {},
}) {
    const [animate, setAnimate] = React.useState("visible");

    const [drag, setDrag] = React.useState(true);

    const [hovering, setHovering] = React.useState(false);
    const [canStart, setCanStart] = React.useState(false);

    const destroy = () => {
        setAnimate("exit");
        setDrag(false);
    };

    const click = e => {
        if (destroyOnClick) destroy();
        onClick(e);
    };

    const variants = {
        initial: { x: "calc(100% + 2.5rem)" },
        visible: {
            x: 0,
            transition: {
                duration: 0.5,
                type: "spring",
                damping: 22,
                stiffness: 500,
            },
        },
        exit: { x: "calc(100% + 2.5rem)", transition: { duration: 0.2 } },
    };

    return (
        <Container
            type={type}
            variants={variants}
            initial="initial"
            animate={animate}
            drag={drag}
            onClick={click}
            onAnimationComplete={definition => {
                if (definition === "exit") {
                    onEnd();
                } else if (definition === "visible") {
                    setCanStart(true);
                }
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}>
            <ContentContainer>
                <InnerContentContainer>
                    {/* <IconContainer>{TYPES_TO_ICON_DATA[type]}</IconContainer> */}
                    {TYPES_TO_ICON_DATA[type]}
                    <LabelContainer>{label}</LabelContainer>
                </InnerContentContainer>
            </ContentContainer>

            <ProgressContainer>
                <ProgressBar
                    reverse
                    time={duration}
                    width="100%"
                    onEnd={destroy}
                    filledColour={TYPES_TO_COLOUR[type]}
                    unfilledColour="white"
                    height="0.2rem"
                    pauseOnHover
                    hovering={hovering}
                    canStart={canStart}
                />
            </ProgressContainer>

            <CrossSvg size={20} svgData={CrossSvgData} fill="white" />
        </Container>
    );
}

export default Notification;
