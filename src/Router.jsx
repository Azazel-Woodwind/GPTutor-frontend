import * as MyLessons from "./pages/Dashboard/MyLessons";
import * as Users from "./pages/Dashboard/Users";
import * as LessonsDashboard from "./pages/Dashboard/LessonsDashboard";
import * as WaitingList from "./pages/WaitingList";
import * as Test1 from "./pages/Test1";
import * as Login from "./pages/Login";
import * as Register from "./pages/Register";
import * as ActivateAccount from "./pages/ActivateAccount";
import * as RecoverPassword from "./pages/RecoverPassword";
import * as Hub from "./pages/Hub";
import * as CreateLesson from "./pages/CreateLesson";
import * as ResetPassword from "./pages/Settings/ResetPassword";
import * as Profile from "./pages/Settings/Profile";
import * as Account from "./pages/Settings/Account";
import * as Appearance from "./pages/Settings/Appearance";
import * as Notifications from "./pages/Settings/Notifications";
import * as General from "./pages/Settings/General";
import * as Plans from "./pages/Settings/Plans";
import * as Quiz from "./pages/Quiz";
import * as Lessons from "./pages/Lessons";
import * as Classroom from "./pages/Classroom";
import * as Unauthorised from "./pages/Unauthorised";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom/dist/umd/react-router-dom.development";
import PublicFooter from "./components/PublicFooter";
import PublicWrapper from "./wrappers/PublicWrapper";
import ApplicationWrapper from "./wrappers/ApplicationWrapper";
import SettingsWrapper from "./wrappers/SettingsWrapper";
import DashboardWrapper from "./wrappers/DashboardWrapper";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <WaitingList.Element />
                <PublicFooter />
            </>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },

    // {
    //     path: "/test",
    //     element: <Test1.Element />,
    // },
    // {
    //     path: "/",
    //     element: <PublicWrapper />,
    //     children: [
    //         {
    //             path: "/login",
    //             element: <Login.Element />,
    //         },
    //         {
    //             path: "/register",
    //             element: <Register.Element />,
    //         },
    //     ],
    // },
    // {
    //     path: "/activate",
    //     element: <ActivateAccount.Element />,
    // },
    // {
    //     path: "/",
    //     element: <ApplicationWrapper />,
    //     // errorElement: <Error />, need to implement this
    //     children: [
    //         {
    //             path: "/reset-password",
    //             element: <RecoverPassword.Element />,
    //         },
    //         {
    //             path: "/hub",
    //             element: <Hub.Element />,
    //         },
    //         {
    //             path: "/create-lesson",
    //             element: <CreateLesson.Element action="create" />,
    //         },
    //         {
    //             path: "/edit-lesson",
    //             element: <CreateLesson.Element action="edit" />,
    //         },
    //         {
    //             path: "/settings",
    //             element: <SettingsWrapper />,
    //             children: [
    //                 {
    //                     index: true,
    //                     element: <Navigate to="/settings/general" replace />,
    //                 },
    //                 {
    //                     path: "/settings/general",
    //                     element: <General.Element />,
    //                 },
    //                 {
    //                     path: "/settings/reset-password",
    //                     element: <ResetPassword.Element />,
    //                 },
    //                 {
    //                     path: "/settings/profile",
    //                     element: <Profile.Element />,
    //                 },
    //                 {
    //                     path: "/settings/account",
    //                     element: <Account.Element />,
    //                 },
    //                 {
    //                     path: "/settings/appearance",
    //                     element: <Appearance.Element />,
    //                 },
    //                 {
    //                     path: "/settings/notifications",
    //                     element: <Notifications.Element />,
    //                 },
    //                 {
    //                     path: "/settings/plans",
    //                     element: <Plans.Element />,
    //                 },
    //                 {
    //                     path: "*",
    //                     element: <Navigate to="/settings/general" replace />,
    //                 },
    //             ],
    //         },
    //         {
    //             path: "/dashboard",
    //             element: <DashboardWrapper />,
    //             children: [
    //                 {
    //                     path: "/dashboard/my-lessons",
    //                     element: <MyLessons.Element />,
    //                     action: MyLessons.action,
    //                     loader: MyLessons.loader,
    //                 },
    //                 {
    //                     path: "/dashboard/users",
    //                     element: <Users.Element />,
    //                     loader: Users.loader,
    //                 },
    //                 {
    //                     path: "/dashboard/lessons",
    //                     element: <LessonsDashboard.Element />,
    //                     loader: LessonsDashboard.loader,
    //                 },
    //             ],
    //         },
    //         {
    //             path: "/lessons",
    //             element: <Lessons.Element />,
    //             loader: Lessons.loader,
    //         },
    //         {
    //             path: "/quiz/:lessonName", // ?id="yer28736427384yb23c78e"
    //             element: <Quiz.Element />,
    //             loader: Quiz.loader,
    //         },
    //         {
    //             path: "/lessons/:lessonName", // ?id="yer28736427384yb23c78e"
    //             element: <Classroom.Element />,
    //             loader: Classroom.loader,
    //         },
    //     ],
    // },
    // {
    //     path: "/unauthorised",
    //     element: <Unauthorised.Element />,
    // },
]);

function Router() {
    return <RouterProvider router={router} />;
}

export default Router;
