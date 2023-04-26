import React from "react";
import useModal from "../../hooks/useModal";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import CustomButton from "../../components/Button";
import { motion } from "framer-motion";
import { fade_animation } from "../../styles/FramerAnimations";

function StartLessonModal({ setStarted, currentLesson }) {
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const onClick = () => setStarted(true);

    return (
        <motion.div {...fade_animation()}>
            <Modal {...ModalProps}>
                <CenteredColumn fillparent>
                    <h1>
                        Consequat proident nostrud deserunt nulla aliqua ipsum.
                    </h1>
                    <CustomButton onClick={onClick}>
                        Click here to start the lesson!
                    </CustomButton>
                </CenteredColumn>
            </Modal>
        </motion.div>
    );
}

export default StartLessonModal;
