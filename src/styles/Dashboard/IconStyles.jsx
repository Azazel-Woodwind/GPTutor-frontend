import { css } from "styled-components";

const IconStyles = css`
    width: 26px;
    color: ${props => props.theme.colours.secondary};
    ${props =>
        !props.disabled
            ? `
    cursor: pointer;
    &:hover {
        color: ${props.theme.colours.primary};
    }
    `
            : "opacity: 0.5;"}
`;

export default IconStyles;
