import React from "react";
import { useSubmit } from "react-router-dom";
import TextWrapper from "@/components/utils/TextWrapper";
import { ButtonRow, ModalContainer } from "./PublishLessonModal";
import Button from "@/components/common/input/Button/Button";

function ApproveLessonModal({ lesson, handleClose }) {
    const submit = useSubmit();

    return (
        <ModalContainer fillparent gap="1.25rem">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you would like to approve publication of the lesson
                titled '{lesson.title}'?
            </TextWrapper>
            <ButtonRow>
                <Button onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
                    onClick={() => {
                        console.log(lesson);
                        submit(
                            {
                                ...lesson,
                                action: "setStatus",
                                newStatus: "Verified",
                            },
                            {
                                method: "put",
                                action: "/dashboard/lessons",
                            }
                        );
                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Approve</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

export default ApproveLessonModal;
