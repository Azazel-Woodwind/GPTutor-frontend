import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const MarkLabel = styled.div`
    ${({ trackHeight }) => css`
        position: absolute;
        top: ${0.9 * trackHeight}px;
    `}
`;

export const Mark = styled.div`
    ${({ markSize }) => css`
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 50%;
        height: ${markSize};
        width: ${markSize};
        background-color: #000000a2;
    `}
`;

export const MarksContainer = styled.div`
    ${({ markSize, marks }) => css`
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: ${marks === true ? css`calc(100% + ${markSize})` : "100%"};
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `}
`;

export const TooltipContainer = styled(motion.div)`
    ${({ tooltipFontSize }) => css`
        position: absolute;
        transform: translateY(-120%);
        user-select: none;
        color: ${props => props.theme.colours.primary};
        padding: 0.2rem 0.5rem;
        background-color: #21273f;
        border-radius: 0.5rem;
        font-size: ${tooltipFontSize};
    `}
`;

export const Knob = styled(motion.div)`
    ${({ size, knobX, theme }) => css`
        position: absolute;
        display: flex;
        justify-content: center;

        z-index: 2;
        top: calc(50% - ${size / 2}px);
        left: ${knobX}px;

        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        ${theme.gradient()}
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.3);
        cursor: pointer;
    `}
`;

export const Track = styled(motion.div)`
    ${({ width, height, fillWidth, theme }) => css`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        width: ${width}px;
        height: ${height}px;
        border-radius: 0.625rem;
        z-index: 0;
        ${theme.gradient()}

        cursor: pointer;

        ::after {
            content: "";
            position: absolute;
            right: 0;
            height: 100%;
            width: ${width - fillWidth}px;
            background-color: rgb(150, 150, 150);
            border-radius: 0.625rem;
        }
    `}
`;
