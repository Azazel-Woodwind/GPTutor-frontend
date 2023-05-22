import React from "react";
import styled from "styled-components";
import { TextWrapper } from "../../styles/TextWrappers";
import { Pending } from "@styled-icons/material-outlined/Pending";
import { Draft } from "@styled-icons/remix-line/Draft";
import { Check } from "@styled-icons/material/Check";
import { ErrorOutline } from "@styled-icons/material/ErrorOutline";

const statusIcons = {
    Draft: <Draft size="1.5em" />,
    Pending: <Pending size="1.5em" />,
    Verified: <Check size="1.5em" />,
    Rejected: <ErrorOutline size="1.5em" />,
};

function StatusChip({ status, ...props }) {
    return (
        <Container status={status} {...props}>
            {statusIcons[status]}
            <TextWrapper fontSize="md">{status}</TextWrapper>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3em;

    border-radius: 20px;
    padding: 0.4em 1em;
    padding-left: 0.8em;

    width: 100%;

    ${props => {
        switch (props.status) {
            case "Draft":
                return `background-color: ${props.theme.colours.primaryFaded}`;
            case "Pending":
                return `background-color: ${props.theme.colours.glow}`;
            case "Verified":
                return props.theme.gradient();
            case "Rejected":
                return `background-color: ${props.theme.colours.error}`;
        }
    }}
`;

export default StatusChip;
