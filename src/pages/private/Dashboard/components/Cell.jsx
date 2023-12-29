import styled from "styled-components";

const Cell = styled.span.withConfig({
    shouldForwardProp: (prop, defaultValidator) =>
        !["content"].includes(prop) && defaultValidator(prop),
})`
    display: flex;
    width: 8rem;

    ${props =>
        props.content !== undefined && !props.content && "font-style: italic;"}
`;

export default Cell;
