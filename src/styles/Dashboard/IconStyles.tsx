import { css } from "styled-components";

const IconStyles = css`
    width: 26px;
    color: ${props => props.theme.colours.secondary};
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.colours.primary};
    }
`;

export default IconStyles;
