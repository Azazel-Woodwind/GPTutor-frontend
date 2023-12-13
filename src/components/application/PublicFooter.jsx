import React from "react";
import styled from "styled-components";
import TextWrapper from "@/components/utils/TextWrapper";

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
