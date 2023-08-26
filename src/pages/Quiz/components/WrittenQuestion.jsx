import React from "react";
import { useTheme } from "styled-components";
import Textfield from "../../../components/input/Textfield";
import CollapsableText from "../../../components/CollapsableText";

function WrittenQuestion({
    question,
    questionIndex,
    answer,
    setAnswer,
    submitAnswer,
    loading,
}) {
    // const [finalAnswer, setFinalAnswer] = React.useState(undefined);
    const answerTextfieldRef = React.useRef(null);

    // const theme = useTheme();

    // if (!finalAnswer && currentFeedback?.isCorrect) {
    //     setFinalAnswer(answer);
    // }

    // React.useEffect(() => {
    //     if (
    //         question.finished
    //     ) {
    //         setFinalAnswer(question.modalAnswer || answer);
    //     }
    // }, [question.finished]);

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
                    rows={2}
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
            {/* <div
                style={{
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625em",
                }}>
                {incorrectFeedback?.map(feedback => (
                    <IncorrectFeedback
                        key={feedback}
                        feedback={feedback}
                        currentFeedback={currentFeedback}
                        questionIndex={questionIndex}
                    />
                ))}
                {currentFeedback?.questionIndex === questionIndex &&
                    currentFeedback?.isCorrect === false && (
                        <CollapsableText
                            style={{
                                color: theme.colours.error,
                            }}
                            collapsable={false}>
                            {currentFeedback.text}
                        </CollapsableText>
                    )}
            </div> */}
        </>
    );
}

function IncorrectFeedback({ feedback, currentFeedback, questionIndex }) {
    const [collapsed, setCollapsed] = React.useState(false);

    React.useEffect(() => {
        if (
            currentFeedback?.questionIndex === questionIndex &&
            currentFeedback?.text.length === 1
        ) {
            setCollapsed(true);
        }
    }, [currentFeedback]);

    const theme = useTheme();

    return (
        <CollapsableText
            style={{
                color: theme.colours.error,
            }}
            {...{
                collapsed,
                setCollapsed,
            }}>
            {feedback}
        </CollapsableText>
    );
}

export default WrittenQuestion;
