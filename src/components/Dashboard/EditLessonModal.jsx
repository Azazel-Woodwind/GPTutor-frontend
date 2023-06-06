import React from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import CustomButton from "../Button";
import { TextWrapper } from "../../styles/TextWrappers";
import { Content } from "./PublishLessonModal";
import { ButtonRow } from "./PublishLessonModal";
import { ModalContainer } from "./PublishLessonModal";

function EditLessonModal({ lesson, handleClose }) {
    const navigate = useNavigate();

    return (
        <ModalContainer fillparent gap="30px">
            <Content>
                <TextWrapper fontSize="xl" fontWeight="bold">
                    Are you sure you would like to edit the lesson titled '
                    {lesson.title}'?
                </TextWrapper>
                <TextWrapper fontSize="lg" style={{ padding: "0 30px" }}>
                    If you do, this lesson will be automatically unpublished and
                    will need to be verified by an administrator before it
                    becomes publicly available again.
                </TextWrapper>
            </Content>

            <ButtonRow>
                <CustomButton onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </CustomButton>
                <CustomButton
                    onClick={() => {
                        navigate(`/edit-lesson?id=${lesson.id}`);
                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Edit Lesson</TextWrapper>
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export default EditLessonModal;
