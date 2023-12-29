import styled from "styled-components";
import CenteredColumn from "@/components/common/layout/CenteredColumn";
import Avatar from "./XAvatar";
import React from "react";
import Button from "@/components/common/input/Button";

// Embrace the shadows ; find the truth

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    width: 40rem;
`;

const Title = styled.h1`
    margin-right: 0.8rem;
    font-size: 2.8rem;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    overflow: auto;
    /* border: 10px solid black; */
`;

const SubContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    gap: 3rem;
    height: fit-content;
    width: fit-content;

    @media (max-width: 1300px) {
        flex-direction: column-reverse;
        padding: 8rem 0 4rem 0;
        gap: 1.5rem;
    }
`;

/**
 * XForm - A form component that encapsulates form elements, a submit button, and an optional link.
 * It includes an Avatar component and is styled to center its contents.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Form elements to be included in the form.
 * @param {string} props.submitButtonText - Text for the submit button.
 * @param {Function} props.onSubmit - Function to handle form submission.
 * @param {string} props.title - The title of the form.
 * @param {React.ReactNode} [props.link] - An optional link component to be displayed in the form.
 * @param {boolean} [props.isValid] - A flag to control the disabled state of the submit button.
 * @returns {React.Component} A styled form component.
 */
function XForm({
    children,
    submitButtonText,
    onSubmit,
    title,
    link,
    isValid,
    ...props
}) {
    return (
        <Container {...props}>
            <SubContainer>
                <Avatar size={200} hasLogo style={{ margin: "auto" }} />
                <CenteredColumn gap="1.5rem">
                    <Title>{title}</Title>
                    <FormContainer onSubmit={onSubmit}>
                        {children}
                        <Button
                            style={{ marginTop: "0.5rem" }}
                            disabled={isValid}>
                            {submitButtonText}
                        </Button>
                        {link && link}
                    </FormContainer>
                </CenteredColumn>
            </SubContainer>
        </Container>
    );
}

/**
 * React.memo optimization to prevent unnecessary re-renders.
 * Compares props to determine if the component should re-render.
 */
function formPropsAreEqual(prevProps, nextProps) {
    return prevProps.isValid === nextProps.isValid;
}

export default React.memo(XForm, formPropsAreEqual);
