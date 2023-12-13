import React from "react";
import AnimatedModal from "./Modal/AnimatedModal";

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
        Modal: AnimatedModal,
    };
}

export default useModal;
