import styled from "styled-components";

const StyledIcon = icon => styled(icon)`
    color: ${props =>
        props.focused
            ? props.theme.colours.secondary
            : props.theme.colours.primaryFaded};

    background-color: transparent;
`;

export default StyledIcon;
