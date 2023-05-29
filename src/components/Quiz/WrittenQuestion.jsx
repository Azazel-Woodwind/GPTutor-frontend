import React from "react";
import { useTheme } from "styled-components";
import Textfield from "../Textfield";

function WrittenQuestion({
    question,
    correctFeedback,
    currentFeedback,
    questionIndex,
    answer,
    setAnswer,
    selectedChoiceIndex,
    submitAnswer,
    incorrectFeedback,
}) {
    const [finalAnswer, setFinalAnswer] = React.useState(undefined);
    const theme = useTheme();

    if (!finalAnswer && currentFeedback?.isCorrect) {
        setFinalAnswer(answer);
    }

    return (
        <>
            <h2>{question.question}</h2>
            <Textfield
                multiline
                value={finalAnswer || answer}
                onChange={e => setAnswer(e.target.value)}
                label="Answer"
                width="400px"
                disabled={correctFeedback || currentFeedback?.isCorrect}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        if (!e.shiftKey) {
                            submitAnswer({
                                answer,
                                choiceIndex:
                                    question.type === "written"
                                        ? undefined
                                        : selectedChoiceIndex,
                            });
                        }
                    } else if (e.key === "Space") {
                        e.stopPropagation();
                    }
                }}
            />
            <div
                style={{
                    maxWidth: "700px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}>
                {incorrectFeedback?.map(feedback => (
                    <p
                        key={feedback}
                        style={{
                            color: theme.colours.error,
                        }}>
                        {feedback}
                    </p>
                ))}
                {currentFeedback?.questionIndex === questionIndex &&
                    currentFeedback?.isCorrect === false && (
                        <p
                            style={{
                                color: theme.colours.error,
                            }}>
                            {currentFeedback.text}
                        </p>
                    )}
            </div>
        </>
    );
}

export default WrittenQuestion;
