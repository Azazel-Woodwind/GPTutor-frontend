import React from "react";
import styled from "styled-components";

const AbsoluteCenteredStyle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

function AbsoluteCentered({ children, className, ...props }) {
    return (
        <AbsoluteCenteredStyle className={className} {...props}>
            {children}
        </AbsoluteCenteredStyle>
    );
}

export default AbsoluteCentered;
