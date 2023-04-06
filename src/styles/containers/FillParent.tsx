import React from "react";
import styled from "styled-components";

const FillParentStyle = styled.div`
    height: 100%;
    width: 100%;
`;

function FillParent({ children, className }) {
    return <FillParentStyle className={className}>{children}</FillParentStyle>;
}

export default FillParent;
