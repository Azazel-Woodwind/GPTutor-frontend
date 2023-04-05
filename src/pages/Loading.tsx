import React from "react";
import styled from "styled-components";

function Loading() {
    return (
        <Wrapper>
            <div className="flex justify-center items-center h-screen relative">
                <div className="bg-[#3750C0] hidden md:block absolute bottom-[0px] left-0 blur-[382px] w-[600px] h-[300px]" />
                <div className="bg-[#3750C0] hidden md:block absolute bottom-[0px] left-0 blur-[382px] w-[600px] h-[300px]" />
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-900"></div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    top: 0px;
    right: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 10000000;
    background-color: #040a1e;
    position: absolute;
`;
export default Loading;
