import styled from "styled-components";
import React from "react";

const GradientBorder = styled.div`
    ${props => props.theme.gradient({ animationLength: 5 })}
    padding: 1px;
`;

const ChildContainer = styled.div`
    background-clip: padding-box;
    background: ${props => props.theme.colours.tertiary};
`;

const GradientOutline = ({ children, hidden }) => {
    if (hidden) return <div style={{ padding: "1px" }}> {children} </div>;

    return (
        <GradientBorder>
            <ChildContainer> {children} </ChildContainer>
        </GradientBorder>
    );
};

export default GradientOutline;
