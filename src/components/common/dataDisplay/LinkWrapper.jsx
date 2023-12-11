import styled from "styled-components";

const Link = styled.span`
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colours.primaryStrong};
    cursor: pointer;

    :hover {
        color: #999999;
        text-decoration-color: #999999;
    }
`;

export default Link;
