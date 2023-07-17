import styled from "styled-components";

function HandleIcon() {
    return (
        <Container>
            <HandleLine />
            <HandleLine />
        </Container>
    );
}

const HandleLine = styled.div`
    height: 100%;
    flex: 1;

    background-color: rgb(174, 174, 174);
`;

const Container = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    gap: 0.3rem;
`;

export default HandleIcon;
