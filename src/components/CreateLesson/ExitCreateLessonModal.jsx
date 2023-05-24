import React from "react";
import {
    ButtonRow,
    Content,
    ModalContainer,
} from "../Dashboard/PublishLessonModal";
import { TextWrapper } from "../../styles/TextWrappers";
import CustomButton from "../Button";

function ExitCreateLessonModal({ setConfirmed, isPublished, form, onSubmit }) {
    const publish = isPublished && form.formState.isValid;
    return (
        <ModalContainer
            fillparent
            gap="40px"
            style={{ paddingBottom: "20px", paddingTop: "20px" }}>
            <Content>
                <TextWrapper fontSize="xl" fontWeight="bold">
                    Are you sure you want to leave? Your changes may be
                    permanently lost.
                </TextWrapper>
            </Content>
            <ButtonRow>
                <CustomButton
                    onClick={() => {
                        setConfirmed(false);
                    }}
                    outline>
                    <TextWrapper fontSize="lg" mainGradient>
                        Cancel
                    </TextWrapper>
                </CustomButton>
                <CustomButton
                    onClick={async e => {
                        setConfirmed(true);
                        if (!(publish || !isPublished)) {
                            form.setValue("is_published", false, {
                                shouldValidate: true,
                            });
                        }

                        form.handleSubmit(onSubmit)(e);
                    }}>
                    <TextWrapper fontSize="lg">
                        {publish ? "Publish & Exit" : "Save as Draft & Exit"}
                    </TextWrapper>
                </CustomButton>
                <CustomButton
                    type="error"
                    onClick={() => {
                        setConfirmed(true);
                    }}>
                    <TextWrapper fontSize="lg">Discard changes</TextWrapper>
                </CustomButton>
            </ButtonRow>
        </ModalContainer>
    );
}

export default ExitCreateLessonModal;
