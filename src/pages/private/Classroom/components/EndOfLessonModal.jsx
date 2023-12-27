import styled from "styled-components";
import Button from "@/components/common/input/Button/Button";
import Textfield from "@/components/common/input/Textfield/Textfield";
import useModal from "@/hooks/useModal/useModal";
import { fade_animation } from "@/lib/animation";
import CenteredColumn from "@/components/common/layout/CenteredColumn";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function EndOfLessonModal() {
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const navigate = useNavigate();

    return (
        <motion.div {...fade_animation()}>
            <Modal {...ModalProps} height="370px">
                <CenteredColumn fillparent gap="1rem">
                    <Title> Lesson has been completed </Title>
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
export default EndOfLessonModal;
