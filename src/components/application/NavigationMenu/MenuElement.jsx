import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    border-left: 0.25rem solid rgb(0, 0, 0, 0);
    ${props =>
        props.active &&
        `border-left: 0.25rem solid ${props.theme.colours.glow};`}

    display: flex;
    gap: 0.5rem;
    cursor: pointer;
`;

const MenuElementStyle = styled.div.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["active"].includes(prop) && defaultValidatorFn(prop),
})`
    border-radius: 0.3125rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    color: ${props => props.theme.colours.primaryFaded};

    :hover {
        background-color: rgb(255, 255, 255, 0.1);
    }
    ${props =>
        props.active &&
        `background-color: rgb(255, 255, 255, 0.12); color: ${props.theme.colours.primary};`}
    width: 100%;
    height: 100%;
    padding: 0.55rem 2rem;
    padding-left: 0.5rem;
`;
const IconWrapper = styled.div``;
const Text = styled.span``;

function MenuElement({ children, Icon, subPath }) {
    const [path, currentSubPath] = useLocation().pathname.split("/").slice(1);
    const active = subPath == currentSubPath;
    const navigate = useNavigate();
    const onClick = e => navigate(`/${path}/${subPath}`);
    // console.log(active);
    return (
        <Container onClick={onClick} active={active}>
            <MenuElementStyle active={active}>
                <IconWrapper>
                    <Icon active={active} />
                </IconWrapper>
                <Text> {children}</Text>
            </MenuElementStyle>
        </Container>
    );
}

export default MenuElement;
