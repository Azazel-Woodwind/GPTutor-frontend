import React from "react";
import NavigationBlockerModal from "./NavigationBlockerModal";

/**
 * useNavigationBlocker - A custom hook to manage navigation blocking.
 * It provides a modal component to prevent navigation away from the current page.
 * Useful in scenarios where changes on the page are unsaved, and you want to prompt the user before navigating away.
 *
 * @returns {Object} An object containing the NavigationBlockerModal component and its props, along with a confirmed state and setter.
 */
function useNavigationBlocker() {
    const [confirmed, setConfirmed] = React.useState(undefined);

    return {
        Prompt: NavigationBlockerModal,
        PromptProps: {
            confirmed,
            setConfirmed,
        },
        confirmed,
        setConfirmed,
    };
}

export default useNavigationBlocker;
