import styled from "styled-components";
import { Home } from "@styled-icons/boxicons-regular";
import { JournalBookmark } from "styled-icons/bootstrap";
import { Dashboard } from "@styled-icons/boxicons-solid";
import { Settings2Outline } from "@styled-icons/evaicons-outline";
import { BookAdd } from "@styled-icons/boxicons-solid/BookAdd";
import NavOption from "./NavOption";

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
    return <NavOption path="/hub" label={"Hub"} Icon={StyledHome} />;
}

function NavigateLessons() {
    return <NavOption path="/lessons" label={"Lessons"} Icon={StyledBook} />;
}

function NavigateCreateLesson() {
    return (
        <NavOption
            path="/create-lesson"
            Icon={StyledBookAdd}
            label={"Create Lesson"}
        />
    );
}

function NavigateDashboard() {
    return (
        <NavOption
            path="/dashboard/lessons"
            Icon={StyledDashboard}
            label={"Dashboard"}
        />
    );
}

function NavigateSettings() {
    return (
        <NavOption
            path="/settings/general"
            Icon={StyledSettings}
            label={"Settings"}
        />
    );
}

const NavigationStyle = styled.div`
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
    return (
        <NavigationStyle>
            <NavigateHome />
            <NavigateLessons />
            <NavigateDashboard />
            <NavigateCreateLesson />
            <NavigateSettings />
        </NavigationStyle>
    );
}

export default Navigation;
