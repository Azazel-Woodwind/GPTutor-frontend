import Button from "@/components/common/input/Button";
import React from "react";

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
