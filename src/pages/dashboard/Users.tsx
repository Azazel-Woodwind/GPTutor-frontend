import React from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import SubmitButton from "../../components/Button";
import { Textfield } from "../../components/Textfield";

const Profile = () => {
    const users = useLoaderData();

    const onSubmit = () => {};
    return (
        <Container>
            <div>
                <h1> Users </h1>
                <p>
                    Deserunt voluptate dolor do proident laborum amet in
                    consequat sit minim.
                </p>
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
