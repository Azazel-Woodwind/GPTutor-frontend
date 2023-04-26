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
        margin: 0.3em;
        max-width: 80ch;
    }

    p {
        margin-bottom: 0.5em;
    }

    ${props => props.gap && `gap: ${props.gap}`};
    ${props => props.fullscreen && `height: 100vh; width: 100vw;`};
    ${props => props.wrap && `flex-wrap: wrap;`};
    ${props => props.fillparent && `height: 100%; width: 100%;`};
    ${props => props.fillwidth && `width: 100%;`};
    ${props => props.fillheight && `height: 100%;`};
    ${props => props.width && `width: ${props.width};`};
    ${props => props.flex && `flex: ${props.flex};`};
    ${props => props.border && `border: 10px solid black;`}; // debugging
`;

function CenteredColumn({ children, className, ...props }) {
    return (
        <CenteredColumnStyle className={className} {...props}>
            {children}
        </CenteredColumnStyle>
    );
}

export default CenteredColumn;
