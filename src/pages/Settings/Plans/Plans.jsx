import React from "react";
import styled from "styled-components";

const Profile = () => {
    const onSubmit = () => {};
    return (
        <Container>
            <div>
                <h1> Manage your XTutor plan</h1>
                <p>
                    Manage your billing settings, subscriptions and your current
                    XTutor plan and usage.
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
