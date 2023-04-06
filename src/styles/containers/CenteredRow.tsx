import React from "react";
import styled from "styled-components";

const CenteredRowStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${props => props.gap && `gap: ${props.gap}`};
`;

function CenteredRow({ children, className, ...props }) {
    return (
        <CenteredRowStyle className={className} {...props}>
            {children}
        </CenteredRowStyle>
    );
}

export default CenteredRow;
