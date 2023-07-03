import styled from "styled-components";
import XAvatar from "../../components/XAvatar";
import { AlternateGlobalStyle } from "../../styles/GlobalStyles";
import { TextWrapper } from "../../styles/TextWrappers";

function Loading({ message, ...props }) {
    return (
        <Wrapper centered {...props}>
            <AlternateGlobalStyle />
            <XAvatar size={150} />
            <TextWrapper fontSize="xxl">{message || "Loading..."}</TextWrapper>
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

    gap: 2rem;
`;

export default Loading;
