import React from "react";
import {
    unstable_useBlocker as useBlocker,
    useNavigate,
} from "react-router-dom";
import useModal from "../useModal";

/**
 * NavigationBlockerModal - A component to block navigation away from the current page.
 * It displays a modal to confirm if the user really wants to navigate away.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.when - Condition to determine if navigation should be blocked.
 * @param {boolean} props.confirmed - State to manage the confirmation of navigation.
 * @param {Function} props.setConfirmed - Function to set the confirmed state.
 * @param {React.ReactNode} props.children - Children components to be rendered inside the modal.
 * @returns {React.Component} A modal component that blocks navigation based on certain conditions.
 *
 * @see useNavigationBlocker.js
 */
function NavigationBlockerModal({ when, confirmed, setConfirmed, children }) {
    const [nextLocation, setNextLocation] = React.useState(null);

    const navigate = useNavigate();

    const block = when;
    const { handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: false,
    });

    // Hook to block navigation based on conditions
    useBlocker(args => {
        // console.log(args);
        if (!confirmed && block) {
            // console.log("here");
            setNextLocation(args.nextLocation.pathname);
            handleOpen();
            return true;
        }
        return false;
    });

    // Effect to navigate or close the modal based on confirmation
    React.useEffect(() => {
        if (confirmed) {
            navigate(nextLocation);
        } else if (confirmed === false) {
            // console.log("here");
            handleClose();
            setConfirmed(undefined);
        }
    }, [confirmed]);

    return (
        <Modal key={block} {...ModalProps} type="dropIn">
            {children}
        </Modal>
    );
}

export default NavigationBlockerModal;
