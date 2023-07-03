import RequireInactiveUser from "../../wrappers/RequireInactiveUser";
import ActivateForm from "./components/ActivateForm";

function ActivateAccount() {
    return (
        <RequireInactiveUser>
            <ActivateForm />
        </RequireInactiveUser>
    );
}

export default ActivateAccount;
