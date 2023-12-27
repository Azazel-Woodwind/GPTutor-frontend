import styled from "styled-components";
import TextWrapper from "@/components/utils/TextWrapper";
import { Pending } from "@styled-icons/material-outlined/Pending";
import { Draft } from "@styled-icons/remix-line/Draft";
import { Check } from "@styled-icons/material/Check";
import { ErrorOutline } from "@styled-icons/material/ErrorOutline";

const statusIcons = {
    Draft: <Draft size="1.5rem" />,
    Pending: <Pending size="1.5rem" />,
    Verified: <Check size="1.5rem" />,
    Rejected: <ErrorOutline size="1.5rem" />,
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
    gap: 0.3rem;

    border-radius: 1.25rem;
    padding: 0.4rem 1rem;
    padding-left: 0.8rem;

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
