import React from "react";
import useModal from "../../hooks/useModal";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import CustomButton from "../Button";
import { motion } from "framer-motion";
import { fade_animation } from "../../styles/FramerAnimations";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

function GeneratingQuestionModal({ questionNum, goToPrevQuestion }) {
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const navigate = useNavigate();

    return (
        <motion.div {...fade_animation()}>
            <Modal {...ModalProps} cancellable={false}>
                <CenteredColumn fillparent gap="15px">
                    <h1>Generating Question {questionNum}...</h1>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                        {questionNum > 1 && (
                            <CustomButton onClick={goToPrevQuestion}>
                                Click here to start the lesson!
                            </CustomButton>
                        )}
                        <CustomButton onClick={() => navigate("/lessons")}>
                            Exit quiz
                        </CustomButton>
                    </div>
                </CenteredColumn>
            </Modal>
        </motion.div>
    );
}

export default GeneratingQuestionModal;
