import styled from "styled-components";
import { Home } from "@styled-icons/boxicons-regular";
import { JournalBookmark } from "styled-icons/bootstrap";
import { Dashboard } from "@styled-icons/boxicons-solid";
import { Settings2Outline } from "@styled-icons/evaicons-outline";
import { BookAdd } from "@styled-icons/boxicons-solid/BookAdd";

const Icon = icon => styled(icon).withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["focused"].includes(prop) && defaultValidatorFn(prop),
})`
    color: ${props => props.theme.colours.primaryFaded};

    background-color: transparent;

    ${props => props.focused && `color: ${props.theme.colours.secondary};`}
`;

const StyledHome = Icon(Home);
const StyledBook = Icon(JournalBookmark);
const StyledDashboard = Icon(Dashboard);
const StyledSettings = Icon(Settings2Outline);
const StyledBookAdd = Icon(BookAdd);

function NavigateHome() {
    <LinkWrapper path="/hub" label={"Hub"} Icon={StyledHome} {...props} />;
}

function NavigateLessons() {
    <LinkWrapper path="/lessons" label={"Lessons"} Icon={StyledBook} />;
}

function NavigateCreateLesson() {
    <LinkWrapper
        path="/create-lesson"
        Icon={StyledBookAdd}
        label={"Create Lesson"}
    />;
}

function NavigateDashboard() {
    <LinkWrapper
        path="/dashboard/my-lessons"
        Icon={StyledDashboard}
        label={"Dashboard"}
    />;
}

function NavigateSettings() {
    <LinkWrapper
        path="/settings/general"
        Icon={StyledSettings}
        label={"Settings"}
    />;
}

const Navigation = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    max-width: 100%;
    border-radius: 0.25rem;
    z-index: 10;
    padding: 1rem 0.5rem;
    gap: 2.5rem;
`;

function Navigation() {
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
}

export default Navigation;
