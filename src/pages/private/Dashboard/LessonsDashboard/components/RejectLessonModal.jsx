import { useSubmit } from "react-router-dom";
import TextWrapper from "@/components/utils/TextWrapper";
import Button from "@/components/common/input/Button";
import { ButtonRow } from "./PublishLessonModal";

function RejectLessonModal({ lesson, handleClose }) {
    const submit = useSubmit();

    return (
        <ModalContainer fillparent gap="1.25rem">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you would like to Reject publication of the lesson
                titled '{lesson.title}'?
            </TextWrapper>
            <ButtonRow>
                <Button onClick={handleClose}>
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
                    type="error"
                    onClick={() => {
                        console.log(lesson);
                        submit(
                            {
                                ...lesson,
                                action: "setStatus",
                                newStatus: "Rejected",
                            },
                            {
                                method: "put",
                                action: "/dashboard/lessons",
                            }
                        );
                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Reject</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

export default RejectLessonModal;
