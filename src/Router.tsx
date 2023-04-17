import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    Navigate,
    useLocation,
} from "react-router-dom";
import CreateLesson from "./pages/CreateLesson";
import Classroom from "./pages/Classroom";
import Register from "./pages/Register";
import { SocketContextProvider } from "./context/SocketContext";
import { useAuth } from "./context/SessionContext";
import TeacherDashboard from "./pages/TeacherDashboard";
import Unauthorised from "./pages/Unauthorised";
import LessonAPI from "./api/LessonAPI";
import Test1 from "./pages/Test1";
import styled from "styled-components";

import WaitingList from "./pages/WaitingList";
import Lessons from "./pages/Lessons";

import Login from "./pages/Login";
import Hub from "./pages/Hub";
import Header from "./components/Header/header";
import Chat from "./components/Chat";
import Loading from "./pages/Loading";
import Settings from "./pages/SettingsMenu";

import Notification from "./pages/Notification";
import { ChatContextProvider } from "./context/ChatContext";
import PublicFooter from "./components/PublicFooter";
import CenteredColumn from "./styles/containers/CenteredColumn";
import SubjectsAPI from "./api/SubjectAPI";
import { capitaliseFirstLetter, formatEducationLevel } from "./lib/stringUtils";
import CenteredRow from "./styles/containers/CenteredRow";

import Profile from "./pages/settings/Profile";
import Account from "./pages/settings/Account";
import Apperance from "./pages/settings/Appearance";
import Plans from "./pages/settings/Plans";
import Notifications from "./pages/settings/Notifications";
import General from "./pages/settings/General";

import Dashboard from "./pages/DashboardMenu";
import Users from "./pages/dashboard/Users";
import DLessons from "./pages/dashboard/Lessons";

import PageWrapper from "./styles/containers/PageWrapper";
import Scroller from "./components/Scroller";
import MyLessons from "./pages/dashboard/MyLessons";
import { ADMIN_ACCESS_LEVEL } from "./lib/accessLevels";
import EducationLevelsAPI from "./api/EducationLevelAPI";
import UserAPI from "./api/UserAPI";

const ApplicationWrapperStyle = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
`;

const ApplicationInternalStyle = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: auto;

    display: flex;
    flex-direction: column;

    flex: 1 1 auto;
`;

function ApplicationWrapper() {
    const { session } = useAuth();

    if (!session) return <Navigate to={"/login"} replace />;

    return (
        <SocketContextProvider>
            <ApplicationWrapperStyle fillparent>
                <ChatContextProvider>
                    <ApplicationInternalStyle>
                        <Header />
                        <Outlet />
                    </ApplicationInternalStyle>
                    <Chat />
                </ChatContextProvider>
            </ApplicationWrapperStyle>
        </SocketContextProvider>
    );
}

type RouteProtectorProps = {
    accessLevel: number;
    children: any;
};

function RouteProtector({ accessLevel, children }: RouteProtectorProps) {
    const { session } = useAuth();

    const location = useLocation();
    if (session!.user.accessLevel < accessLevel) {
        return <Navigate to={"/hub"} state={{ from: location }} replace />;
    }
    return children ? children : <Outlet />;
}

function PublicWrapper() {
    const { session } = useAuth();

    if (session) return <Navigate to={"/hub"} replace />;

    return (
        <Scroller>
            <Outlet />
            <PublicFooter />
        </Scroller>
    );
}

const router = createBrowserRouter([
    {
        path: "/loading",
        element: <Loading />,
    },
    {
        path: "/test",
        element: <Test1 />,
    },
    {
        path: "/",
        element: <PublicWrapper />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/notification",
                element: <Notification />,
            },
            {
                path: "/register",
                element: <Register />,
                loader: async (): Promise<{
                    subjectOptions: Subject[];
                    educationLevels: EducationLevel[];
                }> => {
                    try {
                        const subjects = await SubjectsAPI.getAll();
                        const educationLevels =
                            await EducationLevelsAPI.getAll();
                        console.log("ALL SUBJECTS:", subjects);
                        console.log("ALL EDUCATION LEVELS:", educationLevels);

                        return {
                            subjectOptions: subjects.map(subject =>
                                capitaliseFirstLetter(
                                    subject.subject
                                        .replaceAll("_", " ")
                                        .replaceAll("ict", "ICT")
                                )
                            ) as Subject[],
                            educationLevels: educationLevels.map(
                                educationLevel =>
                                    formatEducationLevel(
                                        educationLevel.education_level
                                    )
                            ) as EducationLevel[],
                        };
                    } catch (error) {
                        console.log(error);
                        return { subjectOptions: [], educationLevels: [] };
                    }
                },
            },
            {
                path: "/",
                element: <WaitingList />,
                loader: async (): Promise<{
                    subjectOptions: Subject[];
                    educationLevels: EducationLevel[];
                }> => {
                    try {
                        const subjects = await SubjectsAPI.getAll();
                        const educationLevels =
                            await EducationLevelsAPI.getAll();
                        console.log("ALL SUBJECTS:", subjects);
                        console.log("ALL EDUCATION LEVELS:", educationLevels);

                        return {
                            subjectOptions: subjects.map(subject =>
                                capitaliseFirstLetter(
                                    subject.subject
                                        .replaceAll("_", " ")
                                        .replaceAll("ict", "ICT")
                                )
                            ) as Subject[],
                            educationLevels: educationLevels.map(
                                educationLevel =>
                                    formatEducationLevel(
                                        educationLevel.education_level
                                    )
                            ) as EducationLevel[],
                        };
                    } catch (error) {
                        console.log(error);
                        return { subjectOptions: [], educationLevels: [] };
                    }
                },
            },
        ],
    },
    {
        path: "/",
        element: <ApplicationWrapper />,
        children: [
            {
                path: "/hub",
                element: <Hub />,
            },
            {
                path: "/classroom",
                element: <Classroom />,
            },
            {
                path: "/create-lesson",
                element: <CreateLesson action="create" />,
                loader: async (): Promise<{
                    subjectOptions: Subject[];
                    educationLevels: EducationLevel[];
                }> => {
                    try {
                        const subjects = await SubjectsAPI.getAll();
                        const educationLevels =
                            await EducationLevelsAPI.getAll();
                        console.log("ALL SUBJECTS:", subjects);
                        console.log("ALL EDUCATION LEVELS:", educationLevels);

                        return {
                            subjectOptions: subjects.map(subject =>
                                capitaliseFirstLetter(
                                    subject.subject
                                        .replaceAll("_", " ")
                                        .replaceAll("ict", "ICT")
                                )
                            ) as Subject[],
                            educationLevels: educationLevels.map(
                                educationLevel =>
                                    formatEducationLevel(
                                        educationLevel.education_level
                                    )
                            ) as EducationLevel[],
                        };
                    } catch (error) {
                        console.log(error);
                        return { subjectOptions: [], educationLevels: [] };
                    }
                },
            },
            {
                path: "/edit-lesson",
                element: <CreateLesson action="edit" />,
                loader: async (): Promise<{
                    subjectOptions: Subject[];
                    educationLevels: EducationLevel[];
                }> => {
                    try {
                        const subjects = await SubjectsAPI.getAll();
                        const educationLevels =
                            await EducationLevelsAPI.getAll();
                        console.log("ALL SUBJECTS:", subjects);
                        console.log("ALL EDUCATION LEVELS:", educationLevels);

                        return {
                            subjectOptions: subjects.map(subject =>
                                capitaliseFirstLetter(
                                    subject.subject
                                        .replaceAll("_", " ")
                                        .replaceAll("ict", "ICT")
                                )
                            ) as Subject[],
                            educationLevels: educationLevels.map(
                                educationLevel =>
                                    formatEducationLevel(
                                        educationLevel.education_level
                                    )
                            ) as EducationLevel[],
                        };
                    } catch (error) {
                        console.log(error);
                        return { subjectOptions: [], educationLevels: [] };
                    }
                },
            },
            {
                path: "/settings",
                element: <Settings />,
                children: [
                    {
                        path: "/settings/general",
                        element: <General />,
                    },
                    {
                        path: "/settings/profile",
                        element: <Profile />,
                    },
                    {
                        path: "/settings/account",
                        element: <Account />,
                    },
                    {
                        path: "/settings/appearance",
                        element: <Apperance />,
                    },
                    {
                        path: "/settings/notifications",
                        element: <Notifications />,
                    },
                    {
                        path: "/settings/plans",
                        element: <Plans />,
                    },
                ],
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "/dashboard/my-lessons",
                        element: <MyLessons />,
                        loader: async (): Promise<Lesson[]> => {
                            try {
                                const lessons = await LessonAPI.getMyLessons();
                                console.log("ALL LESSONS:", lessons);
                                return lessons;
                            } catch (error) {
                                console.log(error);
                                return [];
                            }
                        },
                    },

                    {
                        path: "/dashboard/users",
                        element: (
                            <RouteProtector accessLevel={ADMIN_ACCESS_LEVEL}>
                                <Users />
                            </RouteProtector>
                        ),
                        loader: async (): Promise<User[]> => {
                            try {
                                const users = await UserAPI.getAll();
                                console.log("ALL USERS:", users);
                                return users;
                            } catch (error) {
                                console.log(error);
                                return [];
                            }
                        },
                    },
                    {
                        path: "/dashboard/lessons",
                        element: (
                            <RouteProtector accessLevel={ADMIN_ACCESS_LEVEL}>
                                <DLessons />
                            </RouteProtector>
                        ),
                        loader: async (): Promise<Lesson[]> => {
                            try {
                                const lessons = await LessonAPI.getAll();
                                console.log("ALL LESSONS:", lessons);
                                return lessons;
                            } catch (error) {
                                console.log(error);
                                return [];
                            }
                        },
                    },
                ],
            },
            {
                path: "/lessons",
                element: <Lessons />,
                loader: async (): Promise<Lesson[]> => {
                    try {
                        const lessons = await LessonAPI.getPublicLessons();
                        console.log("ALL LESSONS:", lessons);
                        return lessons;
                    } catch (error) {
                        console.log(error);
                        return [];
                    }
                },
            },
            {
                path: "/learningpathways",
                element: <Lessons />,
                loader: async (): Promise<Lesson[]> => {
                    try {
                        const lessons = await LessonAPI.getPublicLessons();
                        console.log("ALL LESSONS:", lessons);
                        return lessons;
                    } catch (error) {
                        console.log(error);
                        return [];
                    }
                },
            },
        ],
    },
    {
        path: "/unauthorised",
        element: <Unauthorised />,
    },
]);

function Router() {
    return <RouterProvider router={router} />;
}

export default Router;
