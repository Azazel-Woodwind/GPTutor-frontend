import Button from "@/components/common/input/Button";
import TextWrapper from "@/components/utils/TextWrapper";
import {
    ButtonRow,
    Content,
    ModalContainer,
} from "../../Dashboard/components/PublishLessonModal";

function ExitCreateLessonModal({ setConfirmed, isPublished, form, onSubmit }) {
    const publish = isPublished && form.formState.isValid;
    return (
        <ModalContainer
            fillparent
            gap="2.5rem"
            style={{ paddingBottom: "1.25rem", paddingTop: "1.25rem" }}>
            <Content>
                <TextWrapper fontSize="xl" fontWeight="bold">
                    Are you sure you want to leave? Your changes may be
                    permanently lost.
                </TextWrapper>
            </Content>
            <ButtonRow>
                <Button
                    onClick={() => {
                        setConfirmed(false);
                    }}
                    outline>
                    <TextWrapper fontSize="lg" mainGradient>
                        Cancel
                    </TextWrapper>
                </Button>
                <Button
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
                </Button>
                <Button
                    type="error"
                    onClick={() => {
                        setConfirmed(true);
                    }}>
                    <TextWrapper fontSize="lg">Discard changes</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

export default ExitCreateLessonModal;
