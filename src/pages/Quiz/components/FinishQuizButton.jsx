import React from "react";
import Button from "../../../components/input/Button";

function FinishQuizButton({ generatingFeedback, onClick }) {
    return (
        <Button disabled={generatingFeedback} onClick={onClick}>
            Finish Quiz
        </Button>
    );
}

export default FinishQuizButton;
