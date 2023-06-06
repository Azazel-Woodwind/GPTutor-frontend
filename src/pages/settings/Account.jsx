import React from "react";
import styled from "styled-components";
import supabase from "../../api/configs/supabase";
import CustomButton from "../../components/Button";
import SubmitButton from "../../components/Button";
import { Textfield } from "../../components/Textfield";
import { useNotification } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/SessionContext";
import { capitaliseFirstLetter } from "../../lib/stringUtils";

const Profile = () => {
    const sendNotification = useNotification();
    const navigate = useNavigate();
    const { session } = useAuth();
    // console.log(session);

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
            </div>
            <Textfield
                label="Email"
                type="text"
                required
                value={session.user.email}
                disabled
            />
            <p>Account Type: {capitaliseFirstLetter(session.user.role)}</p>
            <ButtonContainer>
                <CustomButton
                    outline
                    onClick={() => navigate("/settings/reset-password")}>
                    Change password
                </CustomButton>
                <CustomButton outline onClick={signOut}>
                    Sign out
                </CustomButton>
            </ButtonContainer>
        </Container>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
export default Profile;
