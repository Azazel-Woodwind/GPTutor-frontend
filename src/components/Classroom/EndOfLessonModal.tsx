import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import CustomButton from "../Button";
import Modal from "../Modals/Modal";

function EndOfLessonModal() {
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const navigate = useNavigate();

    return (
        <Modal {...ModalProps}>
            <CenteredColumn fillparent>
                <h1> Lesson has been completed </h1>
                <CustomButton
                    onClick={() => {
                        navigate("/hub");
                    }}>
                    Return to main menu
                </CustomButton>
            </CenteredColumn>
        </Modal>
    );
}

export default EndOfLessonModal;
