import styled from "styled-components";

export const FullScreenStyles = styled.div`
    height: 100vh;
    width: 100vw;
`;

export default function FullScreen({ children, className }) {
    return (
        <FullScreenStyles className={className}>{children}</FullScreenStyles>
    );
}
