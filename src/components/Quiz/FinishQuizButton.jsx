import React from "react";
import CustomButton from "../Button";

function FinishQuizButton({ generatingFeedback, onClick }) {
    return (
        <CustomButton disabled={generatingFeedback} onClick={onClick}>
            Finish Quiz
        </CustomButton>
    );
}

export default FinishQuizButton;
