import styled from "styled-components";

const RadioButtonsContainerStyle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2em;
    width: 100%;
`;

export default function RadioButtonsContainer({ children, className }) {
    return (
        <RadioButtonsContainerStyle className={className}>
            {children}
        </RadioButtonsContainerStyle>
    );
}
