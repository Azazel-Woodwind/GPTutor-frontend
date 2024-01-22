import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/SessionContext";

function RequireAnonymous({ children }) {
    const { session } = useAuth();

    if (session) {
        console.log("SESSION FOUND, NAVIGATING TO HUB");
        return <Navigate to={"/hub"} replace />;
    }

    return children || <Outlet />;
}

export default RequireAnonymous;
