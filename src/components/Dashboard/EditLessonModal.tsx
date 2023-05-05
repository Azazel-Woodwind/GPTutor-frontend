import React from "react";
import useModal from "../../hooks/useModal";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import CenteredRow from "../../styles/containers/CenteredRow";
import LessonAPI from "../../api/LessonAPI";
import { useNotification } from "../../context/NotificationContext";
import { useNavigate, useSubmit } from "react-router-dom";
import CustomButton from "../Button";
import styled, { useTheme } from "styled-components";
import { TextWrapper } from "../../styles/TextWrappers";

function EditLessonModal({ lesson, handleClose }) {
    const navigate = useNavigate();

    return (
        <ModalContainer fillparent gap="20px">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you would like to edit the lesson titled '
                {lesson.title}'?
            </TextWrapper>
            <TextWrapper fontSize="lg" style={{ padding: "0 30px" }}>
                If you do, this lesson will be automatically unpublished and
                will need to be verified by an administrator before it becomes
                publicly available again.
            </TextWrapper>
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

export const ModalContainer = styled(CenteredColumn)`
    /* justify-content: flex-start; */
    position: relative;
    padding-bottom: 40px;
`;

export const ButtonRow = styled(CenteredRow)`
    position: absolute;
    gap: 40px;
    bottom: 5px;
`;

export default EditLessonModal;
