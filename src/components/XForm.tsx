import styled from "styled-components";
import SubmitButton from "../components/Button";
import CenteredColumn from "../styles/containers/CenteredColumn";
import CenteredRow from "../styles/containers/CenteredRow";
import Avatar from "./Avatar";
import React from "react";

// Embrace the shadows ; find the truth

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8em;
    z-index: 10;
    width: 35em;
`;

const Title = styled.h1`
    margin-right: 0.2em;
    font-size: 2.2em;
`;

const Subheading = styled.div`
    font-size: 1.8em;
`;

function XForm({ children, submitButtonText, onSubmit, title, link, isValid }) {
    console.log("rerender");

    return (
        <CenteredRow gap="8em" wrap fillparent>
            <Avatar size={200} hasLogo />
            <CenteredColumn gap="1.5em">
                <Title>{title}</Title>
                <FormContainer onSubmit={onSubmit}>
                    {children}
                    <SubmitButton
                        style={{ marginTop: "0.5em" }}
                        disabled={isValid}>
                        {submitButtonText}
                    </SubmitButton>
                    {link && link}
                </FormContainer>
            </CenteredColumn>
        </CenteredRow>
    );
}

function formPropsAreEqual(prevProps, nextProps) {
    // console.log(
    //     prevProps.form.control === nextProps.form.control &&
    //         prevProps.form.formState === nextProps.form.formState
    // );
    return prevProps.isValid === nextProps.isValid;
}

export default React.memo(XForm, formPropsAreEqual);
