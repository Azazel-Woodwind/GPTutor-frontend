import styled from "styled-components";

const HeaderContent = ({ centerContent, rightContent }) => {
    return (
        <>
            <Center>{centerContent}</Center>
            <Right>{rightContent}</Right>
        </>
    );
};

const Center = styled.div`
    position: absolute;
    left: 50%;
    top: 38px;
    transform: translateX(-50%);
`;

const Right = styled.div`
    position: absolute;
    top: 1.6rem;
    right: 4rem;
    z-index: 1000;
`;

export default HeaderContent;
