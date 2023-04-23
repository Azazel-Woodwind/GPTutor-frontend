import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { InformationSolid } from "@styled-icons/zondicons/InformationSolid";

const timerMax = 1000;

const Notification = ({
    duration = 5,
    onClick = () => {},
    label,
    destroyOnClick = true,
    type = "info",
}) => {
    const [animate, setAnimate] = React.useState("visible");

    const [drag, setDrag] = React.useState(true);

    const [timer, setTimer] = React.useState(0);

    const destroy = () => {
        setAnimate("exit");
        setDrag(false);
    };

    const click = e => {
        console.log(e);
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
            variants={variants}
            initial="initial"
            animate={animate}
            drag={drag}
            onClick={click}>
            <ContentContainer>
                <InnerContentContainer>
                    <InfoIcon size={20} />
                    <LabelContainer>{label}</LabelContainer>
                </InnerContentContainer>
            </ContentContainer>

            <ProgressContainer>
                <ProgressBar
                    reverse
                    time={duration}
                    width={"100%"}
                    onEnd={destroy}
                    // max={timerMax}
                    // value={timer}
                />
            </ProgressContainer>
        </Container>
    );
};

const InfoIcon = styled(InformationSolid)``;

const LabelContainer = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    /* border: 2px solid green; */
    padding-bottom: 2px;
`;

const InnerContentContainer = styled.div`
    /* border: 2px solid red; */
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

const ContentContainer = styled.div`
    padding: 0.7em 1em 0.5em 1em;
`;

const ProgressContainer = styled.div`
    width: 100%;
`;
const Container = styled(motion.div)`
    position: absolute;
    min-width: 16em;
    top: 40px;
    right: 40px;
    cursor: pointer;
    background-color: ${props => props.theme.colours.glow};
`;
export default Notification;
