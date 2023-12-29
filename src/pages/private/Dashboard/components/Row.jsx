import styled from "styled-components";

const Row = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    background-color: rgb(255, 255, 255, 0.05);
    ${props => props.headings && "background-color: rgb(255, 255, 255, 0.1);"}
    padding: 0.5rem 1rem;
    position: relative;
    width: 100%;
    span {
        ${props => props.headings && "font-weight: bold;"}//dickhead
    }
`;

export default Row;
