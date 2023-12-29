import styled, { css } from "styled-components";

export const IconSvg = styled.svg`
    width: ${props => props.iconSize - 2 * props.borderWidth}px;
    height: ${props => props.iconSize - 2 * props.borderWidth}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const BorderSvg = styled.svg`
    width: 100%;
    height: 100%;
`;

export const Container = styled.div`
    position: relative;
    width: ${props => props.width || 20}px;
    height: ${props => props.height || 20}px;
    min-width: ${props => props.width || 20}px;
    min-height: ${props => props.height || 20}px;
    ${props =>
        !props.disabled &&
        css`
            cursor: pointer;
        `};
`;
