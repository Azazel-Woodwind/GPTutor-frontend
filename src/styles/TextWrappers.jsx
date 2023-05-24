import styled, { css } from "styled-components";
import { fontSizeOptions, getFontSize } from "../components/Button";

export const TextWrapper = styled.span`
    ${({
        fontSize,
        color,
        mainGradient,
        fontWeight,
        noWrap,
        noHighlight,
        theme,
    }) => css`
        max-width: 80ch;
        ${fontSize
            ? fontSizeOptions.includes(fontSize)
                ? `font-size: ${getFontSize(fontSize)};`
                : `font-size: ${fontSize};`
            : ""}
        ${color ? `color: ${color};` : `color: ${theme.colours.primaryStrong};`}
        ${mainGradient ? `${theme.utils.gradientText}; font-weight: 500;` : ""}
        ${fontWeight ? `font-weight: ${fontWeight};` : ""}
        ${noWrap ? "white-space: nowrap;" : ""}
        ${noHighlight ? "user-select: none;" : ""}
    `}
`;

export const LinkWrapper = styled.span`
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colours.primaryStrong};
    cursor: pointer;

    :hover {
        color: #999999;
        text-decoration-color: #999999;
    }
`;
