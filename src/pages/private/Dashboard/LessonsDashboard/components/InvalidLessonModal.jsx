import React from "react";
import { ButtonRow, ModalContainer } from "./PublishLessonModal";
import TextWrapper from "@/components/utils/TextWrapper";
import Button from "@/components/common/input/Button/Button";

function InvalidLessonModal({ handleClose }) {
    return (
        <ModalContainer fillparent gap="1.25rem">
            <TextWrapper fontSize="xl" fontWeight="bold">
                This lesson cannot be published as it is either incomplete or
                invalid.
            </TextWrapper>
            <TextWrapper fontSize="lg">
                You must edit the lesson to publish it
            </TextWrapper>
            <ButtonRow>
                <Button onClick={handleClose} style={{ width: "12.5rem" }}>
                    <TextWrapper fontSize="lg">OK</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

export default InvalidLessonModal;
