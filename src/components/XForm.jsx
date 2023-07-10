import styled from "styled-components";
import CenteredColumn from "../styles/containers/CenteredColumn";
import Avatar from "./XAvatar";
import React from "react";
import Button from "./input/Button";

// Embrace the shadows ; find the truth

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    z-index: 10;
    width: 40rem;
`;

const Title = styled.h1`
    margin-right: 0.8rem;
    font-size: 2.8rem;
`;

const Container = styled.div`
    display: flex;

    height: 100%;
    /* width: 100%; */
    overflow: auto;
    /* border: 10px solid black; */
`;

const SubContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    gap: 5rem;

    flex-wrap: wrap;
    padding: 2rem 6rem;
    /* border: 10px solid blue; */
`;

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

function formPropsAreEqual(prevProps, nextProps) {
    // console.log(
    //     prevProps.form.control === nextProps.form.control &&
    //         prevProps.form.formState === nextProps.form.formState
    // );
    return prevProps.isValid === nextProps.isValid;
}

export default React.memo(XForm, formPropsAreEqual);
