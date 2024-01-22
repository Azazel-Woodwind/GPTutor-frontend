import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Tooltip from "@/components/common/dataDisplay/Tooltip";

const Boxshadow = styled.div`
    width: 1rem;
    height: 1rem;
    top: 0.2rem;
    right: 0.25rem;
    background-color: ${props => props.theme.colours.secondary}30;
    box-shadow: -3px 0.75rem 35px 3px ${props => props.theme.colours.secondary};
    position: absolute;
`;

const LinkStyle = styled.div`
    cursor: pointer;
    position: relative;
    background-color: transparent;

    :hover {
        svg {
            color: ${props => props.theme.colours.primary};
        }
    }
`;

function NavOption({ path, Icon, label, size }) {
    const navigate = useNavigate();
    const location = useLocation();

    const focused = location.pathname == path;

    const onClick = () => {
        navigate(path);
    };

    return (
        <Tooltip label={label} underneath>
            <LinkStyle focused={focused} onClick={onClick}>
                <Icon focused={focused} size={size || 27} />
                {focused && <Boxshadow />}
            </LinkStyle>
        </Tooltip>
    );
}

export default NavOption;
