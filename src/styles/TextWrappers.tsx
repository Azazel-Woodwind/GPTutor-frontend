import styled from "styled-components";
import { fontSizeOptions, getFontSize } from "../components/Button";

export const TextWrapper = styled.span`
    max-width: 80ch;
    ${props => `
        ${
            props.fontSize
                ? fontSizeOptions.includes(props.fontSize)
                    ? `font-size: ${getFontSize(props.fontSize)}`
                    : `font-size: ${props.fontSize}`
                : ""
        };
        ${props.fontWeight ? `font-weight: ${props.fontWeight}` : ""};
        ${props.mainGradient ? props.theme.utils.gradientText : ""};
        ${
            props.color
                ? `-webkit-text-fill-color: ${props.color}`
                : `-webkit-text-fill-color: ${props.theme.colours.primaryStrong}`
        };
        ${props.nowrap ? "white-space: nowrap;" : ""};
    `}
`;

export const LinkWrapper = styled.span`
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.colours.primaryFaded};
    }
`;
