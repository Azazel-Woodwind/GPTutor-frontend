import { Outlet } from "react-router-dom/dist/umd/react-router-dom.development";
import RequireAnonymous from "./RequireAnonymous";
import PublicFooter from "../components/PublicFooter";

function PublicWrapper() {
    return (
        <RequireAnonymous>
            <Outlet />
            <PublicFooter />
        </RequireAnonymous>
    );
}

export default PublicWrapper;
