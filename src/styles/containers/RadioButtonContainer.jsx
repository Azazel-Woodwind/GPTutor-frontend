import styled from "styled-components";

const RadioButtonsContainerStyle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    ${props => props.gap && `gap: ${props.gap};`}
    /* border: 2px solid black; */
    margin: 0.5rem 0 0.5rem 0.4rem;
`;

export default function RadioButtonsContainer({
    children,
    className,
    ...props
}) {
    return (
        <RadioButtonsContainerStyle className={className} {...props}>
            {children}
        </RadioButtonsContainerStyle>
    );
}
