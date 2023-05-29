import React from "react";
import CustomButton from "../Button";

function SubmitAnswerButton({ onClick, disabled }) {
    return (
        <CustomButton disabled={disabled} onClick={onClick}>
            Submit
        </CustomButton>
    );
}

export default SubmitAnswerButton;
