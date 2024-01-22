import styled from "styled-components";
import { motion } from "framer-motion";

export const UnfilledProgress = styled.div`
    background-color: ${props => props.colour};
    height: 100%;
    flex-grow: 1;
    /* border: 1px solid black; */
`;

export const Container = styled.div`
    position: relative;
    width: ${props => props.width};
    display: flex;
    align-items: center;
    background-color: ${props => props.colour || "rgb(255, 255, 255, 0.1)"};
    height: ${props => props.height};
`;

export const Label = styled.p`
    position: absolute;
    top: ${props => props.stopSize};
    /* top: 50%;
    font-size: 90%;
    width: 150%; */
    color: ${props =>
        !props.active
            ? props.theme.colours.primaryFaded
            : props.theme.colours.primaryStrong};
    /* left: ${props => props.location - 1}%; */
`;

export const Stop = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    left: ${props => props.location - 1}%;
    width: ${props => props.stopSize};
    height: ${props => props.stopSize};
    z-index: 10;

    ::after {
        content: "";
        position: absolute;
        width: 100%;
        padding: 0.15rem;
        height: 100%;
        border-radius: 50%;
        background-color: ${props => (!props.active ? "#1E2335;" : "unset")};
    }

    ${props => props.active && props.theme.gradient({ animationLength: 5 })};
`;

export const Progress = styled(motion.div)`
    height: 100%;
    /* position: absolute;
    ${props => (props.reverse ? "right: 0px;" : "left: 0px;")} */
    background-color: ${props => props.colour};
    /* border: 1px solid blue; */
    ${props => props.colour === "gradient" && props.theme.gradient()}
`;

export const ProgressContainer = styled(motion.div)`
    position: relative;

    overflow: clip;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */

    display: flex;
    flex-direction: ${props => (props.reverse ? "row-reverse" : "row")};
`;
