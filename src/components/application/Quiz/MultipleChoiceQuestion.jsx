import Choice from "@/pages/private/Quiz/components/Choice";
import React from "react";

function MultipleChoiceQuestion({
    question,
    questionIndex,
    setSelectedChoiceIndex,
    generatingFeedback,
    selectedChoiceIndex,
    currentQuestionNum,
}) {
    return (
        <>
            <h2>{question.title}</h2>
            <div
                style={{
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.94em",
                    marginTop: "0.5em",
                }}>
                {question.choices.map((choice, choiceIndex) => (
                    <Choice
                        key={`${questionIndex}-${choiceIndex}`}
                        questionIndex={questionIndex}
                        selectedChoiceIndex={selectedChoiceIndex}
                        setSelectedChoiceIndex={setSelectedChoiceIndex}
                        generatingFeedback={generatingFeedback}
                        choice={choice}
                        choiceIndex={choiceIndex}
                        question={question}
                        currentQuestionNum={currentQuestionNum}
                    />
                ))}
            </div>
        </>
    );
}

export default MultipleChoiceQuestion;
