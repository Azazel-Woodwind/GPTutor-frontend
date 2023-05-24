import React from "react";
import useModal from "../../hooks/useModal";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import CenteredRow from "../../styles/containers/CenteredRow";
import LessonAPI from "../../api/LessonAPI";
import { useNotification } from "../../context/NotificationContext";
import { useSubmit } from "react-router-dom";
import CustomButton from "../Button";
import styled, { useTheme } from "styled-components";
import { TextWrapper } from "../../styles/TextWrappers";

function PublishLessonModal({ lesson, handleClose, onAdminDashboard }) {
    const submit = useSubmit();
    const theme = useTheme();

    return (
        <ModalContainer fillparent>
            <Content>
                <TextWrapper fontSize="xl" fontWeight="bold">
                    Are you sure you would like to publish the lesson titled '
                    {lesson.title}'?
                </TextWrapper>
                <TextWrapper fontSize="lg">
                    This lesson will need to be verified by an administrator
                    before it becomes publicly available.
                </TextWrapper>
            </Content>
            <ButtonRow>
                <CustomButton onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </CustomButton>
                <CustomButton
                    onClick={() => {
                        console.log(lesson);
                        if (onAdminDashboard) {
                            submit(
                                { ...lesson, action: "togglePublished" },
                                {
                                    method: "put",
                                    action: "/dashboard/lessons",
                                }
                            );
                        } else {
                            submit(lesson, {
                                method: "put",
                                action: "/dashboard/my-lessons",
                            });
                        }

                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Publish</TextWrapper>
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export const ModalContainer = styled(CenteredColumn)`
    /* justify-content: flex-start; */
    flex: 1;
    position: relative;
`;

export const Content = styled(CenteredColumn)`
    flex: 1;
    gap: 20px;
`;

export const ButtonRow = styled(CenteredRow)`
    gap: 40px;
`;

export default PublishLessonModal;
