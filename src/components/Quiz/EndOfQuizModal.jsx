import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import CustomButton from "../Button";
import Modal from "../Modal/Modal";
import Textfield from "../Textfield";
import styled from "styled-components";
import { fade_animation } from "../../styles/FramerAnimations";

function EndOfQuizModal() {
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const navigate = useNavigate();

    return (
        <motion.div {...fade_animation()}>
            <Modal {...ModalProps} height="370px">
                <CenteredColumn fillparent gap="1em">
                    <Title> Quiz has been completed </Title>
                    <p>
                        Thanks for participating in XTutor's alpha. We would
                        appreciate feedback on the lesson you just completed.
                    </p>
                    <Textfield
                        width="30em"
                        label="Feedback"
                        type="text"
                        multiline
                    />
                    <CustomButton
                        onClick={() => {
                            navigate("/hub");
                        }}>
                        Submit and return to main menu
                    </CustomButton>
                </CenteredColumn>
            </Modal>
        </motion.div>
    );
}

const Title = styled.h1``;

// const ExitButton = styled(CustomButton)`
//     position: absolute;
//     bottom: 2em;
// `;
export default EndOfQuizModal;