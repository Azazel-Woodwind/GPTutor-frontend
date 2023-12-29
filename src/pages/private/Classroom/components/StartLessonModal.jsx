import { motion } from "framer-motion";
import Button from "@/components/common/input/Button";
import useModal from "@/hooks/useModal";
import { fade_animation } from "@/lib/animation";
import CenteredColumn from "@/components/common/layout/CenteredColumn";

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
                style={{ padding: "3.75rem 9.38rem" }}>
                <CenteredColumn fillparent gap="0.94rem">
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
