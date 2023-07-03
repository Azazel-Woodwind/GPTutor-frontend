import React from "react";
import Button from "../../../components/input/Button";

function SubmitAnswerButton({ onClick, disabled }) {
    return (
        <Button disabled={disabled} onClick={onClick}>
            Submit
        </Button>
    );
}

export default SubmitAnswerButton;
