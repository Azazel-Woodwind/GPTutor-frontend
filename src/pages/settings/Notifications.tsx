import React from "react";
import styled from "styled-components";
import SubmitButton from "../../components/Button";
import { Textfield } from "../../components/Textfield";

const Profile = () => {
    const onSubmit = () => {};
    return (
        <Container>
            <div>
                <h1> Notifications </h1>
                <p>
                    View recent notifications, and notices sent to your account.
                </p>
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
