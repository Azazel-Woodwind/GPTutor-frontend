import { AnimatePresence } from "framer-motion";
import React from "react";
import Modal from "./Modal/Modal";

function AnimatedModal({ children, handleClose, open, ...props }) {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <Modal handleClose={handleClose} {...props}>
                    {children}
                </Modal>
            )}
        </AnimatePresence>
    );
}

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
