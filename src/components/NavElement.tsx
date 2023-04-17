import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavElementWrapper = styled.div`
    border-left: 4px solid rgb(0, 0, 0, 0);
    ${props =>
        props.active && `border-left: 4px solid ${props.theme.colours.glow};`}

    display: flex;
    gap: 0.5em;
    cursor: pointer;
`;

const NavElementStyle = styled.div`
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding-left: 0.5em;

    color: ${props => props.theme.colours.primaryFaded};

    :hover {
        background-color: rgb(255, 255, 255, 0.1);
    }
    ${props =>
        props.active &&
        `background-color: rgb(255, 255, 255, 0.12); color: ${props.theme.colours.primary};`}
    width: 100%;
    height: 100%;
    padding: 0.5em;
`;
const NavIcon = styled.div``;
const NavText = styled.span``;

const NavElement = ({ children, Icon, subPath }) => {
    const [path, currentSubPath] = useLocation().pathname.split("/").slice(1);
    const active = subPath == currentSubPath;
    const navigate = useNavigate();
    const onClick = e => navigate(`/${path}/${subPath}`);
    console.log(active);
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
