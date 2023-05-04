import styled from "styled-components";

const StyledIcon = icon => styled(icon).withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["focused"].includes(prop) && defaultValidatorFn(prop),
})`
    color: ${props => props.theme.colours.primaryFaded};

    background-color: transparent;

    ${props => props.focused && `color: ${props.theme.colours.secondary};`}
`;

export default StyledIcon;
