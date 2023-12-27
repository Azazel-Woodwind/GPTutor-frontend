import RequireInactiveUser from "../../../components/auth/RequireInactiveUser";
import ActivateForm from "./components/ActivateForm";

/**
 * Page that allows inactive users to activate their account after signing up to the waiting list.
 *
 * @page
 * @route /activate
 * @public
 * @returns {JSX.Element} - Renders the account activation form within a
 *                          wrapper for inactive users.
 */
function ActivateAccount() {
    return (
        <RequireInactiveUser>
            <ActivateForm />
        </RequireInactiveUser>
    );
}

export default ActivateAccount;
