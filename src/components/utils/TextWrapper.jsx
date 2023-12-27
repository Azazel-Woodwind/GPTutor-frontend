import { FONT_SIZE_MAPPINGS } from "@/lib/constants";
import styled, { css } from "styled-components";

/**
 * TextWrapper - A styled span component for rendering text with customizable styles.
 *
 * This component accepts several props that affect its appearance:
 * @prop {string} fontSize - The font size of the text. Can be a key from FONT_SIZE_MAPPINGS or a CSS font-size value.
 * @prop {string} color - The color of the text. If not provided, falls back to the theme's primaryStrong color.
 * @prop {boolean} mainGradient - If true, applies a gradient text style.
 * @prop {string} fontWeight - The font weight of the text.
 * @prop {boolean} noWrap - If true, prevents text wrapping.
 * @prop {boolean} noHighlight - If true, disables text selection.
 *
 * @returns {React.Component} A styled span component with the applied text styles.
 */
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
