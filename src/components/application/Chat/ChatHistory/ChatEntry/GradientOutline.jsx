import styled from "styled-components";
import React from "react";

const GradientBorder = styled.div`
    /* ${props =>
        props.contrast
            ? props.theme.contrastGradient
            : props.theme.gradient({ animationLength: 5 })} */
    ${props => props.theme.gradient()}
    padding: 1px;
    overflow-x: clip;
`;

const ChildContainer = styled.div`
    background-clip: padding-box;
    background: ${props => props.theme.colours.tertiary};
`;

/**
 * GradientOutline - A component that wraps its children with a gradient border.
 * It offers an option to hide the gradient and provides a contrast mode.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be wrapped inside the gradient border.
 * @param {boolean} [props.hidden=false] - If true, hides the gradient border.
 * @param {boolean} [props.contrast=false] - If true, applies a contrast gradient instead of the default.
 * @returns {React.Component} A component that renders its children within a gradient border.
 */
function GradientOutline({ children, hidden, contrast }) {
    if (hidden) return <div style={{ padding: "1px" }}> {children} </div>;

    return (
        <GradientBorder contrast={contrast}>
            <ChildContainer> {children} </ChildContainer>
        </GradientBorder>
    );
}

export default GradientOutline;
