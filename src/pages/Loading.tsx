import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
function Loading({ message }) {
    return (
        <Wrapper>
            <Avatar size={200} />
            <h1>
                Amet tempor sit irure est laboris Lorem proident id elit eu
                consequat eu veniam.
            </h1>
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
    justify-content: space-around;
    background-color: #040a1e;
    position: absolute;
    h1 {
        font-weight: 200;
        font-size: 20px;
    }
`;
export default Loading;
