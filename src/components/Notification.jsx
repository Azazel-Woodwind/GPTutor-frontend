import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { InformationSolid } from "@styled-icons/zondicons/InformationSolid";
import SvgIcon from "./SvgIcon";
import {
    CheckSvgData,
    CrossSvgData,
    ErrorSvgData,
    InfoSvgData,
} from "../lib/svgIconData";
import Theme from "../styles/Theme";

const timerMax = 1000;

const TYPES_TO_ICON_DATA = {
    info: <SvgIcon svgData={InfoSvgData} fill="white" size={24} />,
    error: <SvgIcon svgData={ErrorSvgData} fill="white" size={27} />,
    success: <SvgIcon svgData={CheckSvgData} fill="white" size={30} />,
};

const TYPES_TO_COLOUR = {
    info: Theme.colours.glow,
    error: Theme.colours.error,
    success: "transparent",
};

const Notification = ({
    duration = 5,
    onClick = () => {},
    label = "Submit to your master",
    destroyOnClick = true,
    type = "info",
    onEnd = () => {},
}) => {
    const [animate, setAnimate] = React.useState("visible");

    const [drag, setDrag] = React.useState(true);

    const [timer, setTimer] = React.useState(0);

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
        initial: { x: "calc(100% + 40px)" },
        visible: {
            x: 0,
            transition: {
                duration: 0.5,
                type: "spring",
                damping: 22,
                stiffness: 500,
            },
        },
        exit: { x: "calc(100% + 40px)", transition: { duration: 0.2 } },
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
                    height="3px"
                    pauseOnHover
                    hovering={hovering}
                    canStart={canStart}
                />
            </ProgressContainer>

            <CrossSvg size={20} svgData={CrossSvgData} fill="white" />
        </Container>
    );
};

const IconContainer = styled.div`
    max-width: fit-content;
    max-height: fit-content;
    /* width: 20px;
    height: 20px; */
`;

const CrossSvg = styled(SvgIcon)`
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
`;

const LabelContainer = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    /* border: 2px solid green; */
    padding-bottom: 2.3px;
    font-size: 20px;
    color: white;
    font-weight: 600;
`;

const InnerContentContainer = styled.div`
    /* border: 2px solid red; */
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

const ContentContainer = styled.div`
    margin: 1em 2em 0.8em 0.7em;
`;

const ProgressContainer = styled.div`
    width: 100%;
    /* background-color: ${props => props.theme.colours.primaryStrong}; */
`;

const Container = styled(motion.div)`
    position: relative;
    min-width: 350px;
    /* max-width: 20em; */
    /* top: 40px;
    right: 40px; */
    cursor: pointer;
    background-color: ${props => TYPES_TO_COLOUR[props.type]};
    ${props => props.type === "success" && props.theme.gradient()};
`;

export default Notification;
