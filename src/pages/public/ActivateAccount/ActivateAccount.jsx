import RequireInactiveUser from "../../../components/auth/RequireInactiveUser";
import ActivateForm from "./components/ActivateForm";

function ActivateAccount() {
    return (
        <RequireInactiveUser>
            <ActivateForm />
        </RequireInactiveUser>
    );
}

export default ActivateAccount;
