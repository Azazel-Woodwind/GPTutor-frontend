import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/SessionContext";

function RouteProtector({
    accessLevel,
    redirect,
    lowerBound = true,
    children,
}) {
    const { session } = useAuth();

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

export default RouteProtector;
