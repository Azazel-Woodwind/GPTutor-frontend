import React from "react";
import styled from "styled-components";

const Profile = () => {
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
    gap: 0.7rem;
`;
export default Profile;
