import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";

function Loading({ message }) {
    return (
        <Wrapper>
            <Avatar />
            <h1>Loading...</h1>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    top: 0px;
    right: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 10000000;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #040a1e;
    position: absolute;
    h1 {
        font-weight: 200;
        font-size: 20px;
    }
`;
export default Loading;
