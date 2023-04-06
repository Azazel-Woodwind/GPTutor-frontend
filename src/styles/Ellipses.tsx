import React from "react";
import styled from "styled-components";

const BlurredEllipse = styled.div`
    width: 65vh;
    height: 65vh;
    filter: blur(382px);
    position: absolute;
    border-radius: 50%;
`;

export const Ellipse1 = styled(BlurredEllipse)`
    background-color: ${props => props.theme.colours.highlight1};
    top: -30%;
    left: 10%;
    z-index: 0;
`;

export const Ellipse2 = styled(BlurredEllipse)`
    background-color: ${props => props.theme.colours.highlight1};
    bottom: -20%;
    right: 30%;
    z-index: 0;
`;
