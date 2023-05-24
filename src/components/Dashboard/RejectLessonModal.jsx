import React from "react";
import React from "react";
import { useSubmit } from "react-router-dom";
import CustomButton from "../Button";
import { TextWrapper } from "../../styles/TextWrappers";

function RejectLessonModal({ lesson, handleClose }) {
    const submit = useSubmit();

    return (
        <ModalContainer fillparent gap="20px">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you would like to Reject publication of the lesson
                titled '{lesson.title}'?
            </TextWrapper>
            <ButtonRow>
                <CustomButton onClick={handleClose}>
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </CustomButton>
                <CustomButton
                    type="error"
                    onClick={() => {
                        console.log(lesson);
                        submit(
                            {
                                ...lesson,
                                action: "setStatus",
                                newStatus: "Rejected",
                            },
                            {
                                method: "put",
                                action: "/dashboard/lessons",
                            }
                        );
                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Reject</TextWrapper>
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export default RejectLessonModal;
