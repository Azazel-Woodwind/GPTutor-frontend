import styled from "styled-components";

const Row = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
    background-color: rgb(255, 255, 255, 0.05);
    ${props => props.headings && "background-color: rgb(255, 255, 255, 0.1);"}
    padding: 0.5em 1em;
    position: relative;
    width: 100%;
    span {
        ${props => props.headings && "font-weight: bold;"}//dickhead
    }
`;

export const Cell = styled.span`
    display: flex;
    width: 8em;
    /* border: 2px solid red; */
`;

export default Row;
