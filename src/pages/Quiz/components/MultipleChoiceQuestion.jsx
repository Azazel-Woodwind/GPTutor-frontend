import React from "react";
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
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.94em",
                }}>
                {question.question.choices.map((choice, choiceIndex) => (
                    <Choice
                        key={choiceIndex}
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
