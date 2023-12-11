import { Outlet } from "react-router-dom";
import RequireUser from "./RequireUser";
import RouteProtector from "@/components/auth/RouteProtector";
import { INACTIVE_ACCESS_LEVEL } from "@/lib/accessLevels";

function RequireInactiveUser({ children }) {
    return (
        <RequireUser>
            <RouteProtector
                accessLevel={INACTIVE_ACCESS_LEVEL}
                redirect={"/hub"}
                lowerBound={false}>
                {children || <Outlet />}
            </RouteProtector>
        </RequireUser>
    );
}

export default RequireInactiveUser;
