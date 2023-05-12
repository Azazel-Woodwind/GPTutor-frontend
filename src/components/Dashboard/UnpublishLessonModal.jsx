import React from "react";
import { ButtonRow, ModalContainer } from "./PublishLessonModal";
import { TextWrapper } from "../../styles/TextWrappers";
import CustomButton from "../Button";
import { useSubmit } from "react-router-dom";

function UnpublishLessonModal({ lesson, handleClose }) {
    const submit = useSubmit();

    return (
        <ModalContainer fillparent gap="20px">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you would like to unpublish the lesson titled '
                {lesson.title}'?
            </TextWrapper>
            <TextWrapper fontSize="lg">
                If you do, the lesson will need to be re-verified by an
                administrator before being published again.
            </TextWrapper>
            <ButtonRow>
                <CustomButton onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </CustomButton>
                <CustomButton
                    onClick={() => {
                        submit(lesson, {
                            method: "put",
                            action: "/dashboard/my-lessons",
                        });
                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Unpublish</TextWrapper>
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export default UnpublishLessonModal;
