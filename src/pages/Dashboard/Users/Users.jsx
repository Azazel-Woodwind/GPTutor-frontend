import { ADMIN_ACCESS_LEVEL } from "../../../lib/accessLevels";
import RouteProtector from "../../../wrappers/RouteProtector";
import Page from "./components/Page";

function Users() {
    return (
        <RouteProtector accessLevel={ADMIN_ACCESS_LEVEL}>
            <Page />
        </RouteProtector>
    );
}

export default Users;
