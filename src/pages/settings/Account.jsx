import React from "react";
import styled from "styled-components";
import supabase from "../../api/configs/supabase";
import CustomButton from "../../components/Button";
import SubmitButton from "../../components/Button";
import { Textfield } from "../../components/Textfield";
import { useNotification } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const sendNotification = useNotification();
    const navigate = useNavigate();

    const signOut = async e => {
        e.preventDefault();
        console.log("sign out");
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
        }
        sendNotification({
            label: "Signed out successfully!",
            duration: 5,
            type: "success",
        });
    };

    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                }}>
                <h1> Account Settings </h1>
                <p>
                    Change your email, phone number, name etc and sign out of or
                    delete your XTutor account. You can also request your
                    personal data we hold.
                </p>
            </div>
            <Textfield label="Email" type="text" required />
            <CustomButton
                // style={{ width: "fit-content" }}
                outline
                onClick={() => navigate("/settings/reset-password")}>
                Change password
            </CustomButton>
            <p> Est et exercitation dolor cillum sint nisi nisi. </p>
            <Textfield label="Name" type="text" required />
            <Textfield label="Last Name" type="text" required />
            <p> Exercitation laborum ex duis id est tempor non. </p>
            <SubmitButton> Save your changes</SubmitButton>
            <CustomButton
                style={{ width: "fit-content" }}
                outline
                onClick={signOut}>
                Sign out
            </CustomButton>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
export default Profile;
