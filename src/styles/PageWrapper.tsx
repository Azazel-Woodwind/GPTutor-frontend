import React from "react";
import styled from "styled-components";

const PageWrapper = props => {
    return (
        <>
            {props.children}
            <Ellipse1 />
            <Ellipse2 />
        </>
    );
};

const BlurredEllipse = styled.div`
    width: 65vh;
    height: 65vh;
    filter: blur(382px);
    position: absolute;
    border-radius: 50%;
`;

export const Ellipse1 = styled(BlurredEllipse)`
    background-color: ${props => props.theme.colours.highlight1};
    top: -20%;
    left: 35%;
    z-index: 0;
`;

export const Ellipse2 = styled(BlurredEllipse)`
    background-color: ${props => props.theme.colours.highlight2};
    top: 35%;
    left: 20%;
    z-index: 0;
`;

export default PageWrapper; //retarded?
