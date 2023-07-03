import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavElementWrapper = styled.div`
    border-left: 0.25rem solid rgb(0, 0, 0, 0);
    ${props =>
        props.active &&
        `border-left: 0.25rem solid ${props.theme.colours.glow};`}

    display: flex;
    gap: 0.5rem;
    cursor: pointer;
`;

const NavElementStyle = styled.div.withConfig({
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
const NavIcon = styled.div``;
const NavText = styled.span``;

const NavElement = ({ children, Icon, subPath }) => {
    const [path, currentSubPath] = useLocation().pathname.split("/").slice(1);
    const active = subPath == currentSubPath;
    const navigate = useNavigate();
    const onClick = e => navigate(`/${path}/${subPath}`);
    // console.log(active);
    return (
        <NavElementWrapper onClick={onClick} active={active}>
            <NavElementStyle active={active}>
                <NavIcon>
                    <Icon active={active} />
                </NavIcon>
                <NavText> {children}</NavText>
            </NavElementStyle>
        </NavElementWrapper>
    );
};

export default NavElement;
