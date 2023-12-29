import React from "react";
import TextWrapper from "@/components/utils/TextWrapper";
import Button from "@/components/common/input/Button";
import {
    ButtonRow,
    ModalContainer,
} from "../../../Dashboard/LessonsDashboard/components/PublishLessonModal";

function XSpeakModal({ reqAudioData, handleClose, onConfirm }) {
    return (
        <ModalContainer fillparent gap="1.25rem">
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
                <Button onClick={handleClose} type={reqAudioData && "error"}>
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
                    type={!reqAudioData && "error"}
                    onClick={() => {
                        handleClose();
                        onConfirm();
                    }}>
                    <TextWrapper fontSize="lg">Yes</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

export default XSpeakModal;
