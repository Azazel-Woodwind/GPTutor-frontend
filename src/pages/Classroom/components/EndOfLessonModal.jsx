import styled from "styled-components";
import Button from "../../../components/input/Button";
import Textfield from "../../../components/input/Textfield";
import useModal from "../../../hooks/useModal";
import { fade_animation } from "../../../styles/FramerAnimations";
import CenteredColumn from "../../../styles/containers/CenteredColumn";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { motion } from "framer-motion";

function EndOfLessonModal() {
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const navigate = useNavigate();

    return (
        <motion.div {...fade_animation()}>
            <Modal {...ModalProps} height="370px">
                <CenteredColumn fillparent gap="1em">
                    <Title> Lesson has been completed </Title>
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
//     bottom: 2em;
// `;
export default EndOfLessonModal;
