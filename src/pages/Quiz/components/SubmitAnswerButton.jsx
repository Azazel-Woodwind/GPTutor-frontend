import React from "react";
import Button from "../../../components/input/Button";

function SubmitAnswerButton({ onClick, disabled }) {
    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            style={{ margin: "auto", fontSize: "1.2em" }}>
            Submit
        </Button>
    );
}

export default SubmitAnswerButton;
