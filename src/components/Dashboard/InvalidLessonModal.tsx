import React from "react";
import { ButtonRow, ModalContainer } from "./PublishLessonModal";
import { TextWrapper } from "../../styles/TextWrappers";
import CustomButton from "../Button";

function InvalidLessonModal({ handleClose }) {
    return (
        <ModalContainer fillparent gap="20px">
            <TextWrapper fontSize="xl" fontWeight="bold">
                This lesson cannot be published as it is either incomplete or
                invalid.
            </TextWrapper>
            <TextWrapper fontSize="lg">
                You must edit the lesson to publish it
            </TextWrapper>
            <ButtonRow>
                <CustomButton onClick={handleClose} style={{ width: "200px" }}>
                    <TextWrapper fontSize="lg">OK</TextWrapper>
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export default InvalidLessonModal;
