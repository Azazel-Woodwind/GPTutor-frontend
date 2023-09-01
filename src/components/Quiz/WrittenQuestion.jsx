import React from "react";
import { useTheme } from "styled-components";
import Textfield from "../input/Textfield";
import CollapsableText from "../CollapsableText";

function WrittenQuestion({
    question,
    questionIndex,
    answer,
    setAnswer,
    submitAnswer,
    loading,
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
                    onChange={e => setAnswer(e.target.value)}
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
                            if (!e.shiftKey) {
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
