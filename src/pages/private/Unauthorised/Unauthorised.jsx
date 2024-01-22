import React from "react";

/**
 * Unauthorised page.
 * Displayed when a user tries to access a page they are not authorised to.
 *
 * @page
 * @route /unauthorised
 * @accessLevel 1 - Student
 * @returns {JSX.Element} - Renders the unauthorised page.
 */
function Unauthorised() {
    return <div>Unauthorised</div>;
}

export default Unauthorised;
