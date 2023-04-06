import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    Navigate,
    useLocation,
} from "react-router-dom";
import FreeZone from "./pages/FreeZone";
import MyLessons from "./pages/MyLessons";
import CreateLesson from "./pages/CreateLesson";
import Classroom from "./pages/Classroom";
import Register from "./pages/Register";
import { SocketContextProvider } from "./context/SocketContext";
import { useAuth } from "./context/SessionContext";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorised from "./pages/Unauthorised";
import Welcome from "./pages/Welcome";
import XFooter from "./components/XFooter";
import LessonAPI from "./api/LessonAPI";
import { apiClient } from "./api/configs/axiosConfig";
import DemoForm from "./pages/DemoForm";
import Test1 from "./pages/Test1";
import Test2 from "./pages/Test2";
import styled from "styled-components";

import WaitingList from "./pages/WaitingList";
import Lessons from "./pages/Lessons";

import Login from "./pages/Login";
import Hub from "./pages/Hub";
import Header from "./components/Header/header";
import Chat from "./components/Chat";
import Loading from "./pages/Loading";
import { ChatContextProvider } from "./context/ChatContext";

const STUDENT_ACCESS_LEVEL = 1;
const TEACHER_ACCESS_LEVEL = 2;
const ADMIN_ACCESS_LEVEL = 3;
const SUPER_ADMIN_ACCESS_LEVEL = 4;

const ApplicationContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const ApplicationWrapperStyle = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`;

const ApplicationInternalStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

function ApplicationWrapper() {
    return (
        <ApplicationWrapperStyle>
            <ChatContextProvider>
                <ApplicationInternalStyle>
                    <Header />
                    <Outlet />
                </ApplicationInternalStyle>
                <Chat />
            </ChatContextProvider>
        </ApplicationWrapperStyle>
    );
}

const AuthWrapper = () => {
    const { session } = useAuth();

    if (!session) return <Navigate to={"/login"} replace />;

    return (
        <SocketContextProvider>
            <Outlet />
            <XFooter />
        </SocketContextProvider>
    );
};

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

    return session ? <Navigate to={"/hub"} replace /> : <Outlet />;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <WaitingList />,
    },
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
                path: "/register",
                element: <Register />,
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
                path: "/lessons",
                element: <Lessons />,
            },
            {
                element: <AuthWrapper />,
                children: [
                    {
                        path: "/hub",
                        element: <FreeZone />,
                    },
                    {
                        path: "/my-lessons",
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
                        path: "/lessons",
                        element: <Lessons />,
                        loader: async (): Promise<Lesson[]> => {
                            try {
                                const lessons =
                                    await LessonAPI.getPublicLessons();
                                console.log("ALL LESSONS:", lessons);

                                return lessons;
                            } catch (error) {
                                console.log(error);
                                return [];
                            }
                        },
                    },
                    {
                        path: "/lesson/:lessonName", // search query includes ?id=lessonId to identify lesson
                        element: <Classroom />,
                    },
                    {
                        path: "/teacher/dashboard",
                        element: (
                            <RouteProtector accessLevel={TEACHER_ACCESS_LEVEL}>
                                <TeacherDashboard />
                            </RouteProtector>
                        ),
                    },
                    {
                        path: "create-lesson",
                        element: (
                            <RouteProtector accessLevel={STUDENT_ACCESS_LEVEL}>
                                <CreateLesson />
                            </RouteProtector>
                        ),
                    },
                    {
                        path: "/admin/dashboard",
                        element: (
                            <RouteProtector accessLevel={ADMIN_ACCESS_LEVEL}>
                                <AdminDashboard />
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
                    {
                        path: "/unauthorised",
                        element: <Unauthorised />,
                    },
                ],
            },
        ],
    },
]);

function Router() {
    return <RouterProvider router={router} />;
}

export default Router;
