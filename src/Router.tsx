import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
  useLocation,
} from "react-router-dom";
import FreeZone from "./pages/FreeZone";
import Lessons from "./pages/Lessons";
import Login from "./pages/Login";
import CreateLesson from "./pages/CreateLesson";
import Classroom from "./pages/Classroom";
import Register from "./pages/Register";
import Header from "./components/Header/header";
import { SocketContextProvider } from "./context/SocketContext";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { redirect } from "react-router-dom";
import WaitingList from "./pages/WaitingList";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorised from "./pages/Unauthorised";
import SearchLesson from "./pages/SearchLesson";
import Welcome from "./pages/Welcome";

const STUDENT_ACCESS_LEVEL = 1;
const TEACHER_ACCESS_LEVEL = 2;
const ADMIN_ACCESS_LEVEL = 3;
const SUPER_ADMIN_ACCESS_LEVEL = 4;

function ApplicationWrapper() {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  );
}

const AuthWrapper = () => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to={"/login"} replace />;

  return (
    <SocketContextProvider>
      <Outlet />
    </SocketContextProvider>
  );
};

type RouteProtectorProps = {
  accessLevel: number;
};

function RouteProtector({ accessLevel }: RouteProtectorProps) {
  const { user } = useContext(UserContext);
  const location = useLocation();
  if (user?.accessLevel < accessLevel) {
    if (user) {
      return <Navigate to={"/free-zone"} state={{ from: location }} replace />;
    }
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return <Outlet />;
}

function PublicWrapper() {
  const { user } = useContext(UserContext);
  console.log(user);

  if (user) return <Navigate to={"/free-zone"} replace />;

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationWrapper />,
    children: [
      {
        path: "/",
        element: <PublicWrapper />,
        children: [
          {
            path: "/",
            element: <WaitingList />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/searchLesson",
            element: <SearchLesson />,
          },
          {
            path: "/welcome",
            element: <Welcome />,
          },
        ],
      },
      {
        path: "/",
        // element: <AuthWrapper />,
        children: [
          {
            path: "/free-zone",
            element: <FreeZone />,
          },
          {
            path: "/lessons",
            element: <Lessons />,
          },
          {
            path: "/lesson/:lessonName", // search query includes ?id=lessonId to identify lesson
            element: <Classroom />,
          },
          {
            path: "/teacher",
            element: <RouteProtector accessLevel={TEACHER_ACCESS_LEVEL} />,
            children: [
              {
                path: "/teacher/dashboard",
                element: <TeacherDashboard />,
              },
            ],
          },
          {
            path: "create-lesson",
            element: <RouteProtector accessLevel={TEACHER_ACCESS_LEVEL} />,
            children: [
              {
                path: "/create-lesson",
                element: <CreateLesson />,
              },
            ],
          },
          {
            path: "/admin",
            element: <RouteProtector accessLevel={ADMIN_ACCESS_LEVEL} />,
            children: [
              {
                path: "/admin/dashboard",
                element: <AdminDashboard />,
              },
            ],
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
