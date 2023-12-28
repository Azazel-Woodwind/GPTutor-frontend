import React from "react";
import Modal from "./Modal";

function useModal({ initialOpen = false } = {}) {
    const [open, setOpen] = React.useState(initialOpen);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return {
        open,
        handleClose,
        handleOpen,
        ModalProps: {
            open,
            handleClose,
        },
        Modal,
    };
}

export default useModal;
