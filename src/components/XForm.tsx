import styled from "styled-components";
import Avatar from "../components/Avatar";
import SubmitButton from "../components/Button";
import Centerer from "../styles/containers/Centerer";
import CenteredColumn from "../styles/containers/CenteredColumn";
import CenteredRow from "../styles/containers/CenteredRow";
import zIndex from "@mui/material/styles/zIndex";

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8em;
    z-index: 10;
    width: 35em;
`;

const ContentContainer = styled(CenteredRow)`
    gap: 20em;
    flex-wrap: wrap;
    /* border: 5px solid blue; */
`;

const MainContainer = styled(CenteredColumn)`
    flex-grow: 1;
    gap: 0.2em;
`;

const Title = styled.h1`
    margin-right: 0.2em;
    font-size: 2.2em;
`;

const Column = styled(CenteredColumn)`
    gap: 3rem;
    /* border: 5px solid red; */
`;

const Subheading = styled.div`
    font-size: 1.8em;
`;

function XForm({ children, submitButtonText, onSubmit, title }) {
    return (
        <Centerer>
            <Column>
                <ContentContainer>
                    <Avatar size={190} hasLogo />
                    <MainContainer>
                        <Title>{title}</Title>
                        <FormContainer onSubmit={onSubmit}>
                            {children}
                            <SubmitButton style={{ marginTop: "0.5em" }}>
                                {submitButtonText}
                            </SubmitButton>
                        </FormContainer>
                    </MainContainer>
                </ContentContainer>
                <Subheading>REVOLUTIONISING EDUCATION</Subheading>
            </Column>
        </Centerer>
    );
}

export default XForm;
