import styled from "styled-components";

const BlurredEllipse = styled.div`
    width: 100vh;
    height: 100vh;
    filter: blur(35vh);
    position: absolute;
    border-radius: 50%;
    background-color: ${props => props.theme.colours.highlight1};
`;

export default BlurredEllipse;
