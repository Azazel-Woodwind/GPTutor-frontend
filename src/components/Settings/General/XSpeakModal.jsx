import React from "react";
import { ButtonRow, ModalContainer } from "../../Dashboard/PublishLessonModal";
import { TextWrapper } from "../../../styles/TextWrappers";
import CustomButton from "../../Button";

function XSpeakModal({ reqAudioData, handleClose, onConfirm }) {
    return (
        <ModalContainer fillparent gap="20px">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Are you sure you would like to turn{" "}
                {reqAudioData ? "on" : "off"} X Speech?
            </TextWrapper>
            <TextWrapper fontSize="lg">
                {reqAudioData
                    ? "You will hear X's voice when you speak to them again"
                    : "You will no longer be able to hear X's voice until you turn it back on"}
            </TextWrapper>
            <ButtonRow>
                <CustomButton
                    onClick={handleClose}
                    type={reqAudioData && "error"}>
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </CustomButton>
                <CustomButton
                    type={!reqAudioData && "error"}
                    onClick={() => {
                        handleClose();
                        onConfirm();
                    }}>
                    <TextWrapper fontSize="lg">Yes</TextWrapper>
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export default XSpeakModal;