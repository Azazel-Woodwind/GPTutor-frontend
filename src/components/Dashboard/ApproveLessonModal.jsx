import React from "react";
import React from "react";
import { useSubmit } from "react-router-dom";
import CustomButton from "../Button";
import { TextWrapper } from "../../styles/TextWrappers";

function ApproveLessonModal({ lesson, handleClose }) {
    const submit = useSubmit();

    return (
        <ModalContainer fillparent gap="20px">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you would like to approve publication of the lesson
                titled '{lesson.title}'?
            </TextWrapper>
            <ButtonRow>
                <CustomButton onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </CustomButton>
                <CustomButton
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
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export default ApproveLessonModal;
