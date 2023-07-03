import { Outlet } from "react-router-dom/dist/umd/react-router-dom.development";
import RequireUser from "./RequireUser";
import RouteProtector from "./RouteProtector";
import { INACTIVE_ACCESS_LEVEL } from "../lib/accessLevels";

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
