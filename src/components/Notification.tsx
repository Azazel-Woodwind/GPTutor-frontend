import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";

const timerMax = 1000;

const Notification = ({
    duration = 5,
    onClick = () => {},
    label,
    destroyOnClick = true,
}) => {
    const [x, setX] = React.useState(-50);

    const [drag, setDrag] = React.useState(true);

    const [timer, setTimer] = React.useState(0);

    const destroy = () => {
        setX(800);
        setDrag(false);
    };

    const click = e => {
        console.log(e);
        if (destroyOnClick) destroy();
        onClick(e);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev + timerMax / duration / 20);
        }, 50);
        setTimeout(destroy, duration * 1000 + 500);
    }, []);
    return (
        <Container
            transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
            initial={{ x: 200 }}
            animate={{ x }}
            drag={drag}
            onClick={click}>
            {label}
            <ProgressContainer>
                <ProgressBar width={"100%"} max={timerMax} value={timer} />
            </ProgressContainer>
        </Container>
    );
};

const ProgressContainer = styled.div`
    position: absolute;
    bottom: 0px;
    width: 16em;
    left: 0px;
`;
const Container = styled(motion.div)`
    position: absolute;
    width: 16em;
    height: 6em;
    right: 0px;
    padding: 1em 2em;
    padding-bottom: 0em;
    top: 40px;
    cursor: pointer;
    float: right;
    background-color: ${props => props.theme.colours.contrast};
`;
export default Notification;
