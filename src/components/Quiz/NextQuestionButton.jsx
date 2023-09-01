import React from "react";
import Button from "../input/Button";

function NextQuestionButton(props) {
    return (
        <Button {...props} style={{ margin: "auto", fontSize: "1.2em" }}>
            Next Question
        </Button>
    );
}

export default NextQuestionButton;
