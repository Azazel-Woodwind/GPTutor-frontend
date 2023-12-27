import styled from "styled-components";
import { motion } from "framer-motion";
import { BaseButtonStyles } from "../styles";

export const OutlinedButtonStyle = styled(motion.button)`
    ${BaseButtonStyles}
    position: relative;
    background-color: transparent;
    border: none;
    ${props => !props.disabled && "cursor: pointer;"}
    /* overflow: hidden; */
    outline: none;
    /* border: 2px solid red; */
    width: fit-content;
    padding: 0;
`;

export const ButtonText = styled.span`
    position: relative;
    z-index: 1;
    color: ${props => (props.disabled ? "gray" : "transparent")};
    ${props => props.theme.gradient({ animationLength: 5 })}
    -webkit-background-clip: text;
    background-clip: text;
    pointer-events: none;
    font-weight: 600;
`;

export const SvgBorder = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    /* border: 2px solid blue; */
    overflow: visible;
`;

export const IconSvg = styled.svg`
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* transform: translateY(-50%); */
`;
