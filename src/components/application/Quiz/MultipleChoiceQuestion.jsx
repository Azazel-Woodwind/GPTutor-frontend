import Choice from "@/pages/private/Quiz/components/Choice";
import React from "react";

/**
 * MultipleChoiceQuestion - A component for displaying a multiple-choice question within a quiz.
 * It renders each choice as an individual component, managing selection and feedback for each choice.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.question - The question object containing details about the multiple-choice question.
 * @param {number} props.questionIndex - The index of the current question in the quiz.
 * @param {Function} props.setSelectedChoiceIndex - Function to set the index of the selected choice.
 * @param {boolean} props.generatingFeedback - Indicates if feedback is being generated for the question.
 * @param {number} props.selectedChoiceIndex - The index of the selected choice.
 * @param {number} props.currentQuestionNum - The number of the current question being displayed.
 * @returns {React.Component} Component for rendering a multiple-choice question with its choices.
 */
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
