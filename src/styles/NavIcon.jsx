import styled from "styled-components";

const StyledIcon = icon => styled(icon).withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["active"].includes(prop) && defaultValidatorFn(prop),
})`
    height: 24px;
    width: 24px;
    color: ${props =>
        props.active
            ? props.theme.colours.secondary
            : props.theme.colours.primaryFaded};
`;

export default StyledIcon;
