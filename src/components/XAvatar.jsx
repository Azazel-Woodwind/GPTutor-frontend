import React from "react";
import styled from "styled-components";
import Logo from "../styles/Logo";
import useXAvatar from "../hooks/useXAvatar/useXAvatar";

const XAvatar = ({ size = 200, hasLogo, multiplier, ...props }) => {
    const { XAvatar, XAvatarProps, pulseX } = useXAvatar({ size, ...props });

    React.useEffect(() => {
        if (multiplier !== undefined) {
            pulseX(multiplier);
        }
    }, [multiplier]);

    return (
        <Container>
            <XAvatar {...XAvatarProps} {...props} />
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
    top: 43.1%;
    left: 45%;
    z-index: 100;
`;

const Container = styled.div`
    position: relative;
    height: fit-content;
    width: fit-content;
    /* border: 10px solid black; */
`;
export default React.memo(XAvatar);
