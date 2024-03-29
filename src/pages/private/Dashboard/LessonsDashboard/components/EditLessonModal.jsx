import React from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import TextWrapper from "@/components/utils/TextWrapper";
import { Content } from "./PublishLessonModal";
import { ButtonRow } from "./PublishLessonModal";
import { ModalContainer } from "./PublishLessonModal";
import Button from "@/components/common/input/Button";

function EditLessonModal({ lesson, handleClose }) {
    const navigate = useNavigate();

    return (
        <ModalContainer fillparent gap="1.875rem">
            <Content>
                <TextWrapper fontSize="xl" fontWeight="bold">
                    Are you sure you would like to edit the lesson titled '
                    {lesson.title}'?
                </TextWrapper>
                <TextWrapper fontSize="lg" style={{ padding: "0 1.875rem" }}>
                    If you do, this lesson will be automatically unpublished and
                    will need to be verified by an administrator before it
                    becomes publicly available again.
                </TextWrapper>
            </Content>

            <ButtonRow>
                <Button onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
                    onClick={() => {
                        navigate(`/edit-lesson?id=${lesson.id}`);
                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Edit Lesson</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

export default EditLessonModal;
