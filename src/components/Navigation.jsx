import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Home } from "@styled-icons/boxicons-regular";
import { JournalBookmark } from "styled-icons/bootstrap";
import { Dashboard } from "@styled-icons/boxicons-solid";
import { Settings2Outline } from "@styled-icons/evaicons-outline";
import { BookAdd } from "@styled-icons/boxicons-solid/BookAdd";
import Icon from "../styles/Icon";
import Tooltip from "./Tooltip";

const StyledHome = Icon(Home);
const StyledBook = Icon(JournalBookmark);
const StyledDashboard = Icon(Dashboard);
const StyledSettings = Icon(Settings2Outline);
const StyledBookAdd = Icon(BookAdd);

const Boxshadow = styled.div`
    width: 15px;
    height: 15px;
    top: 3px;
    right: 4px;
    background-color: ${props => props.theme.colours.secondary}30;
    box-shadow: -3px 12px 35px 3px ${props => props.theme.colours.secondary};
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

const LinkWrapper = ({ path, Icon, label, size, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const focused = location.pathname == path;

    const onClick = () => {
        navigate(path);
    };

    return (
        <Tooltip label={label} underneath>
            <LinkStyle focused={focused} onClick={onClick}>
                <Icon focused={focused} size={size || 25} />
                {focused && <Boxshadow />}
            </LinkStyle>
        </Tooltip>
    );
};

export const NavigateHome = props => (
    <LinkWrapper path="/hub" label={"Hub"} Icon={StyledHome} {...props} />
);

export const NavigateLessons = () => (
    <LinkWrapper path="/lessons" label={"Lessons"} Icon={StyledBook} />
);

export const NavigateCreateLesson = () => (
    <LinkWrapper
        path="/create-lesson"
        Icon={StyledBookAdd}
        label={"Create Lesson"}
    />
);

export const NavigateDashboard = () => (
    <LinkWrapper
        path="/dashboard/my-lessons"
        Icon={StyledDashboard}
        label={"Dashboard"}
    />
);

export const NavigateSettings = () => (
    <LinkWrapper
        path="/settings/general"
        Icon={StyledSettings}
        label={"Settings"}
    />
);

const Navigation = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    max-width: 100%;
    border-radius: 5px;
    z-index: 10;
    padding: 1em 0.5em;
    gap: 2.5em;
`;

export default () => {
    // console.log("rendering navigation");

    return (
        <Navigation>
            <NavigateHome />
            <NavigateLessons />
            <NavigateDashboard />
            <NavigateCreateLesson />
            <NavigateSettings />
        </Navigation>
    );
};