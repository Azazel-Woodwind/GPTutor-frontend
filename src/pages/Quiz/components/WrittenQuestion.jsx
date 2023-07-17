import React from "react";
import { useTheme } from "styled-components";
import Textfield from "../../../components/input/Textfield";
import CollapsableText from "../../../components/CollapsableText";

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
    modalAnswer,
    currentAnswer,
}) {
    const [finalAnswer, setFinalAnswer] = React.useState(undefined);
    const answerTextfieldRef = React.useRef(null);

    const theme = useTheme();

    if (!finalAnswer && currentFeedback?.isCorrect) {
        setFinalAnswer(answer);
    }

    React.useEffect(() => {
        if (
            modalAnswer?.answer &&
            modalAnswer?.questionIndex === questionIndex &&
            !finalAnswer
        ) {
            setFinalAnswer(modalAnswer.answer);
        }
    }, [modalAnswer]);

    React.useEffect(() => {
        if (answerTextfieldRef.current && currentAnswer && !finalAnswer) {
            answerTextfieldRef.current.scrollTop =
                answerTextfieldRef.current.scrollHeight;
        }
    }, [currentAnswer]);

    return (
        <>
            <h2>{question.question}</h2>
            <Textfield
                ref={answerTextfieldRef}
                multiline
                value={finalAnswer || currentAnswer || answer}
                onChange={e => setAnswer(e.target.value)}
                label="Answer"
                width="37.5rem"
                rows={4}
                disabled={
                    correctFeedback ||
                    currentFeedback?.isCorrect ||
                    finalAnswer ||
                    currentAnswer
                }
                style={{ fontSize: "1.2rem" }}
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
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                }}>
                {incorrectFeedback?.map(feedback => (
                    <CollapsableText
                        key={feedback}
                        style={{
                            color: theme.colours.error,
                        }}>
                        {feedback}
                    </CollapsableText>
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
            </div>
        </>
    );
}

export default WrittenQuestion;
