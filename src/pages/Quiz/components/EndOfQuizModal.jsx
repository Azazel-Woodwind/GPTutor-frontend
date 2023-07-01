import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import CenteredColumn from "../../../styles/containers/CenteredColumn";
import styled from "styled-components";
import { fade_animation } from "../../../styles/FramerAnimations";
import Textfield from "../../../components/input/Textfield";
import Button from "../../../components/input/Button";

function EndOfQuizModal() {
    const { ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const navigate = useNavigate();

    return (
        <motion.div {...fade_animation()}>
            <Modal {...ModalProps} height="370px">
                <CenteredColumn fillparent gap="1rem">
                    <Title> Quiz has been completed </Title>
                    <p>
                        Thanks for participating in XTutor's alpha. We would
                        appreciate feedback on the lesson you just completed.
                    </p>
                    <Textfield
                        width="30rem"
                        label="Feedback"
                        type="text"
                        multiline
                    />
                    <Button
                        onClick={() => {
                            navigate("/hub");
                        }}>
                        Submit and return to main menu
                    </Button>
                </CenteredColumn>
            </Modal>
        </motion.div>
    );
}

const Title = styled.h1``;

// const ExitButton = styled(Button)`
//     position: absolute;
//     bottom: 2rem;
// `;
export default EndOfQuizModal;
