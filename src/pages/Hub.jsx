import React from "react";
import useConversationDisplay from "../hooks/useConversationDisplay";
import styled from "styled-components";

const Hub = () => {
    useConversationDisplay(true);
    return <></>;
};

const Container = styled.div``;
export default Hub;
