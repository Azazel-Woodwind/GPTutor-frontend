import React from "react";
import styled from "styled-components";

const CenteredColumnStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${props => props.gap && `gap: ${props.gap}`};
`;

function CenteredColumn({ children, className, ...props }) {
    return (
        <CenteredColumnStyle className={className} {...props}>
            {children}
        </CenteredColumnStyle>
    );
}

export default CenteredColumn;
