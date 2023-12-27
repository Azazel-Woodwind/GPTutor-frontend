import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const ImageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${props =>
        props.imageClicked &&
        css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
        `}
`;

export const Container = styled.div`
    position: relative;
    overflow: ${props => (props.imageClicked ? "visible" : "hidden")};

    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Image = styled(motion.img)`
    /* width: 100%; */
    position: absolute;
    object-fit: contain;
    /* max-width: 100vw; */
    cursor: pointer;
    /* border: 0.625rem solid green; */

    /* z-index: 10; */
    ${props =>
        props.selected
            ? css`
                  width: 70%;
                  height: 70%;
              `
            : css`
                  width: 100%;
              `}
`;

export const ArrowContainer = styled(motion.div)`
    top: calc(50% - 1.5rem);
    position: absolute;
    ${props => props.theme.gradient({ animationLength: 5 })}
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 2.5rem;
    z-index: 2;
`;

export const Prev = styled(ArrowContainer)`
    left: 0.625rem;
    transform: scale(-1);
`;

export const Next = styled(ArrowContainer)`
    right: 0.625rem;
`;
