import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";

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

export default AnimatedModal;
