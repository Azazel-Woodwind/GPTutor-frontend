import React from "react";
import styled from "styled-components";
import SubmitButton from "../../components/Button";
import { Textfield } from "../../components/Textfield";

const General = () => {
    const onSubmit = () => {};
    return (
        <Container>
            <div>
                <h1> General Settings </h1>
                <p>Application settings.</p>
            </div>
            <Textfield label="Email" type="text" required />
            <p> Est et exercitation dolor cillum sint nisi nisi. </p>
            <Textfield label="Name" type="text" required />
            <Textfield label="Last Name" type="text" required />
            <p> Exercitation laborum ex duis id est tempor non. </p>
            <SubmitButton> Save your changes</SubmitButton>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7em;
`;
export default General;
