import { Outlet } from "react-router-dom";
import RequireAnonymous from "../../components/auth/RequireAnonymous";
import PublicFooter from "../../components/application/PublicFooter";

function PublicWrapper() {
    return (
        <RequireAnonymous>
            <Outlet />
            <PublicFooter />
        </RequireAnonymous>
    );
}

export default PublicWrapper;
