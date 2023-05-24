import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    Navigate,
    useLocation,
    useNavigate,
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
import Header from "./components/Header/Header";
import Chat from "./components/Chat";
import Loading from "./pages/Loading";
import Settings from "./pages/SettingsMenu";

import { ChatContextProvider } from "./context/ChatContext";
import PublicFooter from "./components/PublicFooter";

import Profile from "./pages/settings/Profile";
import Account from "./pages/settings/Account";
import Apperance from "./pages/settings/Appearance";
import Plans from "./pages/settings/Plans";
import Notifications from "./pages/settings/Notifications";
import General from "./pages/settings/General";

import Dashboard from "./pages/DashboardMenu";
import Users from "./pages/dashboard/Users";

import LessonsDisplay from "./pages/dashboard/LessonsDisplay";
import {
    ADMIN_ACCESS_LEVEL,
    INACTIVE_ACCESS_LEVEL,
    STUDENT_ACCESS_LEVEL,
} from "./lib/accessLevels";
import UserAPI from "./api/UserAPI";
import RecoverPassword from "./pages/RecoverPassword";
import ActivateAccount from "./pages/ActivateAccount";
import React from "react";
import ResetPassword from "./pages/settings/ResetPassword";
import { getLessonByQueryIdLoader } from "./lib/routerLoaders";
import Quiz from "./pages/Quiz";

const ApplicationWrapperStyle = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
`;

const ApplicationInternalStyle = styled.div`
    height: 100vh;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
`;

function ApplicationWrapper() {
    const { event } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (event === "PASSWORD_RECOVERY") {
            navigate("/reset-password");
        }
    }, [event]);

    return (
        <RequireUser>
            <RouteProtector
                accessLevel={STUDENT_ACCESS_LEVEL}
                redirect={"/activate"}>
                <SocketContextProvider>
                    <ApplicationWrapperStyle>
                        <ChatContextProvider>
                            <ApplicationInternalStyle>
                                <Header />
                                <Outlet />
                            </ApplicationInternalStyle>
                            <Chat />
                        </ChatContextProvider>
                    </ApplicationWrapperStyle>
                </SocketContextProvider>
            </RouteProtector>
        </RequireUser>
    );
}

function RouteProtector({
    accessLevel,
    redirect,
    lowerBound = true,
    children,
}) {
    const { session } = useAuth();

    // console.log("SESSION IN ROUTER PROTECTOR: ", session);
    // console.log("ACCESS LEVEL: ", accessLevel);
    // console.log("USER: ", session.user);
    // console.log("USER ACCESS LEVEL: ", session?.user.accessLevel);

    const location = useLocation();
    const navigateAway = lowerBound
        ? session.user.accessLevel < accessLevel
        : session.user.accessLevel > accessLevel;

    if (navigateAway) {
        return (
            <Navigate
                to={redirect || "/hub"}
                state={{ from: location }}
                replace
            />
        );
    }

    return children || <Outlet />;
}

function PublicWrapper() {
    return (
        <RequireAnonymous>
            <Outlet />
            <PublicFooter />
        </RequireAnonymous>
    );
}

function RequireUser({ children }) {
    const { session } = useAuth();

    if (!session) {
        console.log("NO SESSION FOUND, NAVIGATING TO LOGIN");
        return <Navigate to={"/login"} replace />;
    }

    return children || <Outlet />;
}

function RequireAnonymous({ children }) {
    const { session } = useAuth();

    if (session) {
        console.log("SESSION FOUND, NAVIGATING TO HUB");
        return <Navigate to={"/hub"} replace />;
    }

    return children || <Outlet />;
}

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: (
//             <>
//                 <WaitingList />
//                 <PublicFooter />
//             </>
//         ),
//     },
//     {
//         path: "*",
//         element: <RedirectToWaitingList />,
//     },
// ]);

const router = createBrowserRouter([
    {
        path: "/test2",
        element: <ResetPassword />,
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
        element: (
            <>
                <WaitingList />
                <PublicFooter />
            </>
        ),
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
        path: "/activate",
        element: (
            <RequireUser>
                <RouteProtector
                    accessLevel={INACTIVE_ACCESS_LEVEL}
                    redirect={"/hub"}
                    lowerBound={false}>
                    <ActivateAccount />
                </RouteProtector>
            </RequireUser>
        ),
    },
    {
        path: "/",
        element: <ApplicationWrapper />,
        // errorElement: <Error />, need to implement this
        children: [
            {
                path: "/reset-password",
                element: <RecoverPassword />,
            },
            {
                path: "/hub",
                element: <Hub />,
            },
            {
                path: "/create-lesson",
                element: <CreateLesson action="create" />,
            },
            {
                path: "/edit-lesson",
                element: <CreateLesson action="edit" />,
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
                        path: "/settings/reset-password",
                        element: <ResetPassword />,
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
                        element: <LessonsDisplay />,
                        action: async ({ request }) => {
                            if (!["DELETE", "PUT"].includes(request.method)) {
                                throw new Response("Incorrect request method", {
                                    status: 400,
                                    statusText: "Bad Request",
                                });
                            }

                            const data = await request.formData();
                            const lessonID = data.get("id");

                            if (!lessonID) {
                                throw new Response("Missing lesson ID", {
                                    status: 400,
                                    statusText: "Bad Request",
                                });
                            }

                            if (request.method === "DELETE") {
                                try {
                                    await LessonAPI.deleteOwnedByid(lessonID);

                                    return {
                                        ok: true,
                                        message: "Lesson successfully deleted!",
                                    };
                                } catch (error) {
                                    console.log(error);
                                    return {
                                        ok: false,
                                        message:
                                            "There was an error deleting the lesson.",
                                    };
                                }
                            }

                            if (request.method === "PUT") {
                                const oldStatus = data.get("status");
                                try {
                                    // console.log(lessonID);
                                    await LessonAPI.togglePublishById(lessonID);

                                    return {
                                        ok: true,
                                        message: `Lesson successfully ${
                                            ["Draft", "Rejected"].includes(
                                                oldStatus
                                            )
                                                ? "published"
                                                : "unpublished"
                                        }!`,
                                    };
                                } catch (error) {
                                    console.log(error);
                                    return {
                                        ok: false,
                                        message: `There was an error ${
                                            ["Draft", "Rejected"].includes(
                                                oldStatus
                                            )
                                                ? "publishing"
                                                : "unpublishing"
                                        } the lesson.`,
                                    };
                                }
                            }
                        },
                        loader: async () => {
                            try {
                                const lessons = await LessonAPI.getMyLessons();
                                // console.log("ALL LESSONS:", lessons);
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
                        loader: async () => {
                            const users = await UserAPI.getAll();
                            // console.log("ALL USERS:", users);
                            return users;
                        },
                    },
                    {
                        path: "/dashboard/lessons",
                        element: (
                            <RouteProtector accessLevel={ADMIN_ACCESS_LEVEL}>
                                element:{" "}
                                <LessonsDisplay onAdminDashboard={true} />
                            </RouteProtector>
                        ),
                        loader: async () => {
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
                loader: async ({ request }) => {
                    try {
                        const lessons = await LessonAPI.getPublicLessons();
                        // console.log("ALL LESSONS:", lessons);
                        return lessons;
                    } catch (error) {
                        console.log(error);
                        return [];
                    }
                },
            },
            {
                path: "/quiz/:lessonName", // ?id="yer28736427384yb23c78e"
                element: <Quiz />,
                loader: getLessonByQueryIdLoader,
            },
            {
                path: "/lessons/:lessonName", // ?id="yer28736427384yb23c78e"
                element: <Classroom />,
                loader: getLessonByQueryIdLoader,
            },
            {
                path: "/learningpathways",
                element: <Lessons />,
                loader: async () => {
                    try {
                        const lessons = await LessonAPI.getPublicLessons();
                        // console.log("ALL LESSONS:", lessons);
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
