import styled from "styled-components";
import CenteredColumn from "../styles/containers/CenteredColumn";
import XAvatar from "./XAvatar";

function SuccessScreen({ heading, caption }) {
    return (
        <Container gap="2rem" fullscreen>
            <XAvatar size={150} hasLogo />
            <MessageBox gap="2rem">
                <h1>{heading}</h1>
                <h3>{caption}</h3>
            </MessageBox>
        </Container>
    );
}

const MessageBox = styled(CenteredColumn)`
    background-color: rgb(0, 0, 0, 0.03);
    box-shadow: ${props => props.theme.colours.glow}40 0px 8px 36px;
    padding: 1.5rem 8rem;
`;

const Container = styled(CenteredColumn)`
    display: flex;

    b {
        color: ${props => props.theme.colours.secondary};
    }

    h1 {
        padding: 0 2rem;
        color: ${props => props.theme.colours.primary};
        font-weight: 600;
        border-radius: 0.94rem;
        font-size: ${props => props.theme.font.xlarge};
        margin-bottom: 0;
    }

    h3 {
        font-weight: 400;
        margin-top: 0;
    }
`;
export default SuccessScreen;
