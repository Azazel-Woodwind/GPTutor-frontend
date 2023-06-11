import React from "react";
import { useTheme } from "styled-components";
import Choice from "./Choice";

function MultipleChoiceQuestion({
    question,
    questionIndex,
    answer,
    setAnswer,
    setSelectedChoiceIndex,
    correctFeedback,
    currentFeedback,
    incorrectFeedback,
    generatingFeedback,
}) {
    return (
        <>
            <h2>{question.question.title}</h2>
            <div
                style={{
                    maxWidth: "700px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}>
                {question.question.choices.map((choice, choiceIndex) => (
                    <Choice
                        questionIndex={questionIndex}
                        answer={answer}
                        setAnswer={setAnswer}
                        setSelectedChoiceIndex={setSelectedChoiceIndex}
                        correctFeedback={correctFeedback}
                        currentFeedback={currentFeedback}
                        incorrectFeedback={incorrectFeedback?.[choiceIndex]}
                        generatingFeedback={generatingFeedback}
                        choice={choice}
                        choiceIndex={choiceIndex}
                    />
                ))}
            </div>
        </>
    );
}

export default MultipleChoiceQuestion;