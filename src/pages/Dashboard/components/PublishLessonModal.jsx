import React from "react";
import CenteredColumn from "../../../styles/containers/CenteredColumn";
import CenteredRow from "../../../styles/containers/CenteredRow";
import { useSubmit } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { TextWrapper } from "../../../styles/TextWrappers";
import Button from "../../../components/input/Button";

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
                <Button onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
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
                </Button>
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
