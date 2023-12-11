import { FONT_SIZE_MAPPINGS } from "@/lib/constants";
import styled, { css } from "styled-components";

const TextWrapper = styled.span`
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
            ? Object.keys(FONT_SIZE_MAPPINGS).includes(fontSize)
                ? `font-size: ${FONT_SIZE_MAPPINGS[fontSize]};`
                : `font-size: ${fontSize};`
            : ""}
        ${color ? `color: ${color};` : `color: ${theme.colours.primaryStrong};`}
        ${mainGradient ? `${theme.utils.gradientText}; font-weight: 500;` : ""}
        ${fontWeight ? `font-weight: ${fontWeight};` : ""}
        ${noWrap ? "white-space: nowrap;" : ""}
        ${noHighlight ? "user-select: none;" : ""}
    `}
`;

export default TextWrapper;
