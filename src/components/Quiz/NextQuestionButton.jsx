import React from "react";
import CustomButton from "../Button";

function NextQuestionButton({ generatingFeedback, onClick }) {
    return (
        <CustomButton disabled={generatingFeedback} onClick={onClick}>
            Next Question
        </CustomButton>
    );
}

export default NextQuestionButton;
