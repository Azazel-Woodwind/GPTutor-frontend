import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { TextWrapper } from "../styles/TextWrappers";
import { AlternateGlobalStyle } from "../styles/GlobalStyles";

function Loading({ message, ...props }) {
    return (
        <Wrapper centered {...props}>
            <AlternateGlobalStyle />
            <Avatar size={150} />
            <TextWrapper fontSize="xxl">Loading...</TextWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;
    ${props => (props.centered ? "justify-content: center;" : "")}
    /* border: 3px solid green; */

    gap: 2em;
`;

export default Loading;
