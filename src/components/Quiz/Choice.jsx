import React from "react";
import RadioButton from "../RadioButton";
import { useTheme } from "styled-components";

function Choice({
    questionIndex,
    answer,
    setAnswer,
    setSelectedChoiceIndex,
    correctFeedback,
    currentFeedback,
    incorrectFeedback,
    generatingFeedback,
    choice,
    choiceIndex,
}) {
    const theme = useTheme();

    const selected = answer === choice;
    const hasCurrentFeedback =
        currentFeedback?.choiceIndex === choiceIndex &&
        currentFeedback?.questionIndex === questionIndex;
    const isCorrect = correctFeedback?.choiceIndex === choiceIndex;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
            }}>
            <RadioButton
                wrap
                key={`${questionIndex}-${choiceIndex}`}
                label={choice}
                checked={
                    selected ||
                    hasCurrentFeedback ||
                    incorrectFeedback ||
                    isCorrect
                }
                onChange={e => {
                    setAnswer(choice);
                    setSelectedChoiceIndex(choiceIndex);
                }}
                disabled={
                    (hasCurrentFeedback && !currentFeedback?.isCorrect) ||
                    incorrectFeedback ||
                    (generatingFeedback && !selected) ||
                    (correctFeedback && !isCorrect)
                }
            />
            {incorrectFeedback && (
                <p
                    style={{
                        color: theme.colours.error,
                    }}>
                    {incorrectFeedback}
                </p>
            )}
            {currentFeedback?.questionIndex === questionIndex &&
                currentFeedback?.isCorrect === false &&
                currentFeedback?.choiceIndex === choiceIndex && (
                    <p
                        style={{
                            color: theme.colours.error,
                        }}>
                        {currentFeedback.text}
                    </p>
                )}
        </div>
    );
}

export default Choice;
