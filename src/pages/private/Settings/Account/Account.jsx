import React from "react";
import styled from "styled-components";
import supabase from "@/api/configs/supabase";
import Button from "@/components/common/input/Button";
import Textfield from "@/components/common/input/Textfield";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/SessionContext";
import { capitaliseFirstLetter } from "@/utils/string";
import { useNotification } from "@/context/NotificationContext";

const ButtonContainer = styled.div`
    display: flex;
    gap: 1.25rem;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

/**
 * Account Settings page.
 * User can sign out and change their password.
 *
 * @page
 * @route /settings/account
 * @accessLevel 1 - Student
 * @returns {JSX.Element} - Renders the account settings.
 */
function Account() {
    const { sendNotification } = useNotification();
    const navigate = useNavigate();
    const { session } = useAuth();

    const signOut = async e => {
        e.preventDefault();
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
                    gap: "1rem",
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
                <Button
                    outline
                    onClick={() => navigate("/settings/reset-password")}>
                    Change password
                </Button>
                <Button outline onClick={signOut}>
                    Sign out
                </Button>
            </ButtonContainer>
        </Container>
    );
}

export default Account;
