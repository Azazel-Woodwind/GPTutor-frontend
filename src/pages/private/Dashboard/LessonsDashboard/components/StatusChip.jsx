import styled from "styled-components";
import TextWrapper from "@/components/utils/TextWrapper";
import { Pending } from "@styled-icons/material-outlined/Pending";
import { Draft } from "@styled-icons/remix-line/Draft";
import { Check } from "@styled-icons/material/Check";
import { ErrorOutline } from "@styled-icons/material/ErrorOutline";

const statusIcons = {
    Draft: <Draft size="1.5rem" />,
    Published: <Check size="1.5rem" />,
};

function StatusChip({ isPublished, ...props }) {
    return (
        <Container isPublished={isPublished} {...props}>
            {isPublished ? statusIcons.Published : statusIcons.Draft}
            <TextWrapper fontSize="md">
                {isPublished ? "Published" : "Draft"}
            </TextWrapper>
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

    ${props =>
        props.isPublished
            ? props.theme.gradient()
            : `background-color: ${props.theme.colours.primaryFaded}`}
`;

export default StatusChip;
