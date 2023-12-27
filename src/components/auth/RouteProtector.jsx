import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/SessionContext";

/**
 * A guard component that controls access to routes based on user's access level.
 * Redirects to a specified path if the user does not meet the required access level.
 * @guard
 *
 * @param {object} props - The component props.
 * @param {number} props.accessLevel - The required access level for this route.
 * @param {string} [props.redirect] - The path to redirect to if access is denied. Defaults to '/hub'.
 * @param {boolean} [props.lowerBound=true] - If true, access is allowed for access levels greater than or equal to `accessLevel`. If false, access is allowed for levels less than `accessLevel`.
 * @param {React.ReactNode} [props.children] - Child components to render if access is granted.
 * @returns {React.ReactNode} Either the child components or a Navigate component for redirection.
 */
function RouteProtector({
    accessLevel,
    redirect,
    lowerBound = true,
    children,
}) {
    const { session } = useAuth();
    const location = useLocation();

    // Determine if navigation away from the current route is necessary
    const navigateAway = lowerBound
        ? session.user.accessLevel < accessLevel
        : session.user.accessLevel > accessLevel;

    // Redirect if the user does not have the appropriate access level
    if (navigateAway) {
        return (
            <Navigate
                to={redirect || "/hub"}
                state={{ from: location }}
                replace
            />
        );
    }

    // Render children or Outlet if access is granted
    return children || <Outlet />;
}

export default RouteProtector;
