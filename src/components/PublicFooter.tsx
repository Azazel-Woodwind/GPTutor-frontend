import React from "react";
import styled from "styled-components";
import { TextWrapper } from "../styles/TextWrappers";

const FooterWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 10;
    bottom: 1em;
    align-items: center;
    /* border: 1px solid black; */
`;

const CopyrightContainer = styled.div`
    position: absolute;
    bottom: 2%;
    left: 2%;
`;

function PublicFooter() {
    return (
        <CopyrightContainer>
            <TextWrapper size="md">©️ xtutor.ai, 2023</TextWrapper>
        </CopyrightContainer>
    );
}

export default PublicFooter;
