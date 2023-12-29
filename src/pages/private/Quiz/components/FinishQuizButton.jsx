import React from "react";
import Button from "@/components/common/input/Button";

function FinishQuizButton({ generatingFeedback, onClick }) {
    return (
        <Button
            disabled={generatingFeedback}
            onClick={onClick}
            size="lg"
            style={{ margin: "auto", fontSize: "1.2em" }}>
            Finish Quiz
        </Button>
    );
}

export default FinishQuizButton;
