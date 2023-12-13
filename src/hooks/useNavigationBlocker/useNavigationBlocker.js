import React from "react";
import NavigationBlockerModal from "./NavigationBlockerModal";

export function useNavigationBlocker() {
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
