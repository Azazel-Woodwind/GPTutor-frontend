import { AnimatePresence } from "framer-motion";
import ModalContents from "./ModalContents";

function Modal({ children, handleClose, open, ...props }) {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <ModalContents handleClose={handleClose} {...props}>
                    {children}
                </ModalContents>
            )}
        </AnimatePresence>
    );
}

export default Modal;
