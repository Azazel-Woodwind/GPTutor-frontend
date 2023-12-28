import Textfield from "@/components/common/input/Textfield";
import React from "react";

function WrittenQuestion({
    question,
    questionIndex,
    answer,
    setAnswer,
    submitAnswer,
    loading,
    disableSubmit,
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
                            if (!e.shiftKey && !disableSubmit(question)) {
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
