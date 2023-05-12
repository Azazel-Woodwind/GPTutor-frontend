import React from "react";
import styled from "styled-components";
import SubmitButton from "../../components/Button";
import { Textfield } from "../../components/Textfield";
import ProgressBar from "../../components/ProgressBar";

const max = 80000;
const current = 49000;

const General = () => {
    const onSubmit = () => {};
    return (
        <Container>
            <h1> General Settings </h1>
            <p>Application settings.</p>
            <Usage>
                <ProgressBar
                    width="90%"
                    stops={[
                        {
                            label: "average lesson",
                            location: 2000,
                        },
                        {
                            label: "1/4",
                            location: (max / 4) * 1,
                        },
                        {
                            label: "1/2",
                            location: (max / 4) * 2,
                        },
                        {
                            label: "3/4",
                            location: (max / 4) * 3,
                        },
                        {
                            label: "No more usage",
                            location: max,
                        },
                    ]}
                    value={current}
                    max={max}
                />
            </Usage>
            <Textfield label="Email" type="text" required />
            <p> Est et exercitation dolor cillum sint nisi nisi. </p>
            <Textfield label="Name" type="text" required />
            <Textfield label="Last Name" type="text" required />
            <p> Exercitation laborum ex duis id est tempor non. </p>
            <SubmitButton> Save your changes</SubmitButton>
        </Container>
    );
};

const Usage = styled.div`
    margin-bottom: 2em;
    width: 100%;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
export default General;
