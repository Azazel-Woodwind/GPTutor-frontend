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
        ${
            props.color
                ? `color: ${props.color}`
                : `color: ${props.theme.colours.primaryStrong}`
        };
        ${
            props.mainGradient
                ? `${props.theme.utils.gradientText}; font-weight: 500;`
                : ""
        };
        ${props.nowrap ? "white-space: nowrap;" : ""};
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
