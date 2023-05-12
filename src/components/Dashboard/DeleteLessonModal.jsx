import React from "react";
import { ButtonRow, ModalContainer } from "./PublishLessonModal";
import { TextWrapper } from "../../styles/TextWrappers";
import CustomButton from "../Button";
import { useSubmit } from "react-router-dom";

function DeleteLessonModal({ lesson, handleClose }) {
    const submit = useSubmit();

    return (
        <ModalContainer fillparent gap="20px">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you would like to delete the lesson titled '
                {lesson.title}'?
            </TextWrapper>
            <TextWrapper fontSize="lg">
                This action is irreversible.
            </TextWrapper>
            <ButtonRow>
                <CustomButton onClick={handleClose}>
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </CustomButton>
                <CustomButton
                    type="error"
                    onClick={() => {
                        submit(lesson, {
                            method: "delete",
                            action: "/dashboard/my-lessons",
                        });
                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Delete</TextWrapper>
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export default DeleteLessonModal;
