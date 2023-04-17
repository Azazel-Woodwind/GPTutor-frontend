import React from "react";
import styled from "styled-components";
import SubmitButton from "../../components/Button";
import { Textfield } from "../../components/Textfield";

const Profile = () => {
    const onSubmit = () => {};
    return (
        <Container>
            <div>
                <h1> Profile Settings </h1>
                <p>Change XTutor's appearance, and general settings</p>
                <b> Not available during development release </b>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7em;
`;
export default Profile;
