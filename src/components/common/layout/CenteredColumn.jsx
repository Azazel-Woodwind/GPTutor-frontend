import React from "react";
import styled from "styled-components";

const CenteredColumnStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0.3rem;
        max-width: 80ch;
    }

    p {
        margin-bottom: 0.5rem;
    }

    ${props => props.gap && `gap: ${props.gap}`};
    ${props => props.fullscreen && `height: 100vh; width: 100vw;`};
    ${props => props.wrap && `flex-wrap: wrap;`};
    ${props => props.fillparent && `height: 100%; width: 100%;`};
    ${props => props.fillwidth && `width: 100%;`};
    ${props => props.fillheight && `height: 100%;`};
    ${props => props.width && `width: ${props.width};`};
    ${props => props.height && `height: ${props.height};`};
    ${props => props.flex && `flex: ${props.flex};`};
    ${props => props.border && `border: 0.625rem solid black;`}; // debugging
`;

function CenteredColumn({ children, className, ...props }, ref) {
    return (
        <CenteredColumnStyle className={className} {...props} ref={ref}>
            {children}
        </CenteredColumnStyle>
    );
}

export default React.forwardRef(CenteredColumn);
