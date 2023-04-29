import styled from "styled-components";

const StyledIcon = icon => styled(icon)`
    color: ${props => props.theme.colours.primaryFaded};

    background-color: transparent;

    ${props => props.focused && `color: ${props.theme.colours.secondary};`}
`;

export default StyledIcon;
