import React from "react";
import styled from "styled-components";

/**
 * Appearance Settings page.
 * User can change the appearance of XTutor.
 * Currently not implemented
 *
 * @page
 * @route /settings/appearance
 * @accessLevel 1 - Student
 * @returns {JSX.Element} - Renders the appearance settings.
 */
function Appearance() {
    return (
        <Container>
            <div>
                <h1> Profile Settings </h1>
                <p>Change XTutor's appearance, and general settings</p>
                <b> Not available during development release </b>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
`;
export default Appearance;
