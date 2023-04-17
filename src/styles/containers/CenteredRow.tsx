import React from "react";
import styled from "styled-components";

const CenteredRowStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${props => props.gap && `gap: ${props.gap};`};
    ${props => props.fullScreen && `height: 100vh; width: 100vw;`};
    ${props => props.wrap && `flex-wrap: wrap;`};
    ${props => props.fillparent && `height: 100%; width: 100%;`};
    ${props => props.fillwidth && `width: 100%;`};
    ${props => props.fillheight && `height: 100%;`};
    ${props => props.width && `width: ${props.width};`};
    ${props => props.flex && `flex: ${props.flex};`};
    ${props => props.border && `border: 10px solid black;`}; // debugging
`;

function CenteredRow({ children, className, ...props }) {
    return (
        <CenteredRowStyle className={className} {...props}>
            {children}
        </CenteredRowStyle>
    );
}

export default CenteredRow;
