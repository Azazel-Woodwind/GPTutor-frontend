import styled from "styled-components";

export const MultiTextfieldRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    /* border: 2px solid black; */
    ${props => props.gap && `gap: ${props.gap};`}
    ${props => props.wrap && `flex-wrap: wrap;`};
    ${props => props.border && `border: 0.625rem solid black;`}; // debugging
`;
