import React from "react";
import styled from "styled-components";

const BlurredEllipse = styled.div`
    width: 65vh;
    height: 65vh;
    filter: blur(360px);
    position: absolute;
    border-radius: 50%;
    border: 1px solid red;
    background-color: ${props => props.theme.colours.highlight1};
`;

export const Ellipse1 = styled(BlurredEllipse)`
    top: -20%;
    left: 25%;
    z-index: -2;
`;

export const Ellipse2 = styled(BlurredEllipse)`
    bottom: -30%;
    right: -10%;
    z-index: -2;
`;
