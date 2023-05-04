import React from "react";
import useModal from "../../hooks/useModal";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import CustomButton from "../Button";
import { motion } from "framer-motion";
import { fade_animation } from "../../styles/FramerAnimations";

function StartLessonModal({ setStarted, lesson }) {
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const onClick = () => setStarted(true);

    return (
        <motion.div {...fade_animation()}>
            <Modal {...ModalProps} cancellable={false}>
                <CenteredColumn fillparent gap="15px">
                    <h1>{lesson.title}</h1>
                    <CustomButton onClick={onClick}>
                        Click here to start the lesson!
                    </CustomButton>
                </CenteredColumn>
            </Modal>
        </motion.div>
    );
}

export default StartLessonModal;
