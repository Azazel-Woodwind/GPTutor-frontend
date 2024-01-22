import Textfield from "@/components/common/input/Textfield";
import React from "react";

/**
 * WrittenQuestion - A component for displaying and interacting with a written quiz question.
 * It allows users to input their answer into a text field and handles the submission of the answer.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.question - The question object containing details about the question.
 * @param {string} props.answer - The current answer input by the user.
 * @param {Function} props.setAnswer - Function to set the user's answer.
 * @param {Function} props.submitAnswer - Function to submit the answer to the question.
 * @param {boolean} props.loading - Indicates if the question is in the loading state.
 * @returns {React.Component} Component for rendering a written question and its answer field.
 */
function WrittenQuestion({
    question,
    answer,
    setAnswer,
    submitAnswer,
    loading,
    submitDisabled,
    setIsAnswerChanged
}) {
    const answerTextfieldRef = React.useRef(null);

    React.useEffect(() => {
        // setFinalAnswer(question.modalAnswer)
        if (answerTextfieldRef.current && question.modalAnswer) {
            answerTextfieldRef.current.scrollTop =
                answerTextfieldRef.current.scrollHeight;
        }
    }, [question.modalAnswer]);

    return (
        <>
            <h2>{question.questionString}</h2>
            <div
                style={{
                    width: "100%",
                    // padding: "0 1em",
                }}>
                <Textfield
                    ref={answerTextfieldRef}
                    multiline
                    fullwidth
                    value={question.modalAnswer || answer}
                    onChange={e => {setAnswer(e.target.value); setIsAnswerChanged(true)}}
                    label="Your Answer"
                    rows={4}
                    disabled={
                        question.modalAnswer ||
                        loading ||
                        question.finished ||
                        question.marksScored === question.marks
                    }
                    fontSize="1.35em"
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            if (!e.shiftKey && !submitDisabled(question)) {
                                setIsAnswerChanged(false)
                                submitAnswer({
                                    answer,
                                    choiceIndex: undefined,
                                });
                            }
                        } else if (e.key === "Space") {
                            e.stopPropagation();
                        }
                    }}
                />
            </div>
        </>
    );
}

export default WrittenQuestion;
