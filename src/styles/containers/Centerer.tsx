import styled from "styled-components";

export const CentererStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    ${props => props.gap && `gap: ${props.gap}`};
`;

export default function Centerer({ children, className, ...props }) {
    return (
        <CentererStyle className={className} {...props}>
            {children}
        </CentererStyle>
    );
}
