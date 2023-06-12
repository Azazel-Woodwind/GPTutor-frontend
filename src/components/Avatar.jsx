import React from "react";
import useAvatar from "../hooks/useAvatar";
import styled from "styled-components";
import Logo from "../styles/Logo";

const Avatar = ({ size, hasLogo, ...props }) => {
    const { Avatar, avatarProps } = useAvatar({ size });

    return (
        <Container>
            <Avatar {...avatarProps} />
            {hasLogo && (
                <LogoWrapper>
                    <Logo size={size} />
                    <Slogan size={size}>Revolutionising Education</Slogan>
                </LogoWrapper>
            )}
        </Container>
    );
};

const Slogan = styled.div`
    padding: 0;
    text-align: center;
    font-size: ${props => (props.size * 1.5) / 190}em;
`;

const LogoWrapper = styled.div`
    position: absolute;
    top: 43%;
    left: 44.5%;
    z-index: 100;
    /* transform: translate(-50%, -50%); */
`;

const Container = styled.div`
    position: relative;
    height: fit-content;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    /* border: 5px solid blue; */
`;
export default React.memo(Avatar);
