import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { TextWrapper } from "../styles/TextWrappers";

function Loading({ message }) {
    return (
        <Wrapper>
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
    justify-content: center;

    padding-bottom: 6em;
    gap: 2em;
    background-color: #040a1e;
`;

export default Loading;
