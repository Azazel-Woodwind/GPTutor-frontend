import React from "react";
import useModal from "../../../hooks/useModal";
import CenteredColumn from "../../../styles/containers/CenteredColumn";
import { motion } from "framer-motion";
import { fade_animation } from "../../../styles/FramerAnimations";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import Button from "../../../components/input/Button";

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
                            <Button onClick={goToPrevQuestion}>
                                Click here to start the lesson!
                            </Button>
                        )}
                        <Button onClick={() => navigate("/lessons")}>
                            Exit quiz
                        </Button>
                    </div>
                </CenteredColumn>
            </Modal>
        </motion.div>
    );
}

export default GeneratingQuestionModal;
