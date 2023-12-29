import React from "react";
import CenteredColumn from "@/components/common/layout/CenteredColumn";
import CenteredRow from "@/components/common/layout/CenteredRow";
import { useSubmit } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import TextWrapper from "@/components/utils/TextWrapper";
import Button from "@/components/common/input/Button";

function PublishLessonModal({ lesson, handleClose }) {
    const submit = useSubmit();

    return (
        <ModalContainer fillparent>
            <Content>
                <TextWrapper fontSize="xl" fontWeight="bold">
                    Are you sure you would like to publish the lesson titled '
                    {lesson.title}'?
                </TextWrapper>
            </Content>
            <ButtonRow>
                <Button onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
                    onClick={() => {
                        console.log(lesson);
                        submit(lesson, {
                            method: "patch",
                            action: "/dashboard/lessons",
                        });

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
    gap: 1.25rem;
`;

export const ButtonRow = styled(CenteredRow)`
    gap: 2.5rem;
`;

export default PublishLessonModal;
