import React from "react";
import { ButtonRow, ModalContainer } from "../Dashboard/PublishLessonModal";
import { TextWrapper } from "../../styles/TextWrappers";
import CustomButton from "../Button";
import { useNavigate } from "react-router-dom";

function ExitCreateLessonModal({ nextLocation, handleClose, setConfirmed }) {
    return (
        <ModalContainer fillparent gap="20px">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you want to leave? Your changes will be permanently
                lost.
            </TextWrapper>
            <TextWrapper fontSize="lg">
                If you choose to stay, you can save your changes as a draft.
            </TextWrapper>
            <ButtonRow>
                <CustomButton onClick={handleClose}>
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </CustomButton>
                <CustomButton
                    type="error"
                    onClick={() => {
                        setConfirmed(true);
                        console.log(nextLocation);

                        handleClose();
                    }}>
                    <TextWrapper fontSize="lg">Discard changes</TextWrapper>
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export default ExitCreateLessonModal;
