import React from "react";
import Button from "@/components/common/input/Button/Button";

function NextQuestionButton(props) {
    return (
        <Button {...props} style={{ margin: "auto", fontSize: "1.2em" }}>
            Next Question
        </Button>
    );
}

export default NextQuestionButton;
