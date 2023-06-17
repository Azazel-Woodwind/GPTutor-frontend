import React from "react";
import styled from "styled-components";

const BlurredEllipse = styled.div`
    width: 100vh;
    height: 100vh;
    filter: blur(35vh);
    position: absolute;
    border-radius: 50%;
    background-color: ${props => props.theme.colours.highlight1};
`;

export const Ellipse1 = styled(BlurredEllipse)`
    top: -30vh;
    left: -30vh;
    z-index: -2;
`;

export const Ellipse2 = styled(BlurredEllipse)`
    bottom: -30vh;
    right: -30vh;
    z-index: -2;
`;
