import { ButtonRow, Content, ModalContainer } from "./PublishLessonModal";
import TextWrapper from "@/components/utils/TextWrapper";
import { useSubmit } from "react-router-dom";
import Button from "@/components/common/input/Button";

function UnpublishLessonModal({ lesson, handleClose }) {
    const submit = useSubmit();

    return (
        <ModalContainer fillparent gap="1.875rem">
            <Content>
                <TextWrapper fontSize="xl" fontWeight="bold">
                    Are you sure you would like to unpublish the lesson titled '
                    {lesson.title}'?
                </TextWrapper>
            </Content>
            <ButtonRow>
                <Button onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
                    onClick={() => {
                        submit(lesson, {
                            method: "patch",
                            action: "/dashboard/lessons",
                        });
                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Unpublish</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

export default UnpublishLessonModal;
