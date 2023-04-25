import React from "react";
import useModal from "../../hooks/useModal";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import CustomButton from "../Button";

function StartLessonModal({ onClick }) {
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    return (
        <Modal {...ModalProps}>
            <CenteredColumn fillparent>
                <CustomButton onClick={onClick}>
                    Click here to start the lesson!
                </CustomButton>
            </CenteredColumn>
        </Modal>
    );
}

export default StartLessonModal;
