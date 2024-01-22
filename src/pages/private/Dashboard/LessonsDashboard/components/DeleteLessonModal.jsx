import React from "react";
import { ButtonRow, ModalContainer } from "./PublishLessonModal";
import TextWrapper from "@/components/utils/TextWrapper";
import { useSubmit } from "react-router-dom";
import Button from "@/components/common/input/Button";

function DeleteLessonModal({ lesson, handleClose }) {
    const submit = useSubmit();

    return (
        <ModalContainer fillparent gap="1.25rem">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you would like to delete the lesson titled '
                {lesson.title}'?
            </TextWrapper>
            <TextWrapper fontSize="lg">
                This action is irreversible.
            </TextWrapper>
            <ButtonRow>
                <Button onClick={handleClose}>
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
                    type="error"
                    onClick={() => {
                        submit(lesson, {
                            method: "delete",
                            action: "/dashboard/lessons",
                        });
                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Delete</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

export default DeleteLessonModal;
