import { motion } from "framer-motion";
import Button from "../../../components/input/Button";
import useModal from "../../../hooks/useModal";
import { fade_animation } from "../../../styles/FramerAnimations";
import CenteredColumn from "../../../styles/containers/CenteredColumn";

function StartLessonModal({ setStarted, lesson }) {
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const onClick = () => setStarted(true);

    return (
        <motion.div {...fade_animation()}>
            <Modal
                {...ModalProps}
                cancellable={false}
                style={{ padding: "60px 150px" }}>
                <CenteredColumn fillparent gap="15px">
                    <h1>{lesson.title}</h1>
                    <Button onClick={onClick}>
                        Click here to start the lesson!
                    </Button>
                </CenteredColumn>
            </Modal>
        </motion.div>
    );
}

export default StartLessonModal;
