import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/SessionContext";

function RequireUser({ children }) {
    const { session } = useAuth();

    if (!session) {
        console.log("NO SESSION FOUND, NAVIGATING TO LOGIN");
        return <Navigate to={"/login"} replace />;
    }

    return children || <Outlet />;
}

export default RequireUser;
