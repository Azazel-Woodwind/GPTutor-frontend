import React from "react";
import CenteredColumn from "../../../styles/containers/CenteredColumn";
import CenteredRow from "../../../styles/containers/CenteredRow";
import GeneratingQuestion from "./GeneratingQuestion";
import WrittenQuestion from "./WrittenQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import CollapsableText from "../../../components/CollapsableText";
import FinishQuizButton from "./FinishQuizButton";
import NextQuestionButton from "./NextQuestionButton";
import SubmitAnswerButton from "./SubmitAnswerButton";

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        svg {
            width: 550px;
            height: 350px;
            background-color: white;
        }
        text {
            font-size: 14px;
            fill: #000;
        }
    </style>
</head>
<body>
    <svg>
        <circle cx="100" cy="175" r="50" stroke="black" stroke-width="2" fill="none" />
        <text x="50" y="300" text-anchor="middle">Object at Rest</text>

        <circle cx="400" cy="175" r="50" stroke="black" stroke-width="2" fill="none" />
        <line x1="400" y1="175" x2="500" y2="175" stroke="black" stroke-width="2" marker-end="url(#arrowhead)" />
        <text x="400" y="300" text-anchor="middle">Object in Motion</text>

        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
        </defs>
    </svg>
</body>
</html>
`;

function Question({
    i,
    questions,
    answer,
    setAnswer,
    submitAnswer,
    currentFeedback,
    correctFeedback,
    incorrectFeedback,
    currentQuestionNum,
    selectedChoiceIndex,
    setSelectedChoiceIndex,
    generatingFeedback,
    generatingHint,
    generatingAnswer,
    answerIsCorrect,
    nextQuestion,
    loading,
    modalAnswer,
    currentAnswer,
    currentQuestion,
}) {
    const imageRef = React.useRef(null);

    React.useEffect(() => {
        if (imageRef.current.shadowRoot) return;

        const shadowRoot = imageRef.current.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = questions[i]?.imageHTML;
    }, [htmlContent]);

    const callback = React.useCallback(
        node => {
            if (node !== null) {
                node.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        },
        [currentQuestionNum]
    );

    return (
        <CenteredColumn
            width="100vw"
            style={{
                height: "100vh",
                // minHeight?
            }}
            ref={callback}
            key={i}>
            <CenteredRow
                wrap
                fillparent
                gap="1.25em"
                style={
                    {
                        // padding: "1.25em",
                        // paddingLeft: "2em",
                    }
                }>
                <CenteredColumn gap="1.25em" style={{ maxWidth: "60em" }}>
                    {questions[i] === undefined ? (
                        <GeneratingQuestion />
                    ) : (
                        <>
                            <h1>Question #{i + 1}</h1>
                            {questions[i].type === "written" ? (
                                <WrittenQuestion
                                    question={questions[i]}
                                    answer={answer}
                                    setAnswer={setAnswer}
                                    submitAnswer={submitAnswer}
                                    currentFeedback={currentFeedback}
                                    correctFeedback={correctFeedback?.[i]}
                                    incorrectFeedback={incorrectFeedback?.[i]}
                                    questionIndex={i}
                                    selectedChoiceIndex={selectedChoiceIndex}
                                    modalAnswer={modalAnswer}
                                    currentAnswer={currentAnswer}
                                />
                            ) : (
                                <MultipleChoiceQuestion
                                    question={questions[i]}
                                    answer={answer}
                                    setAnswer={setAnswer}
                                    currentFeedback={currentFeedback}
                                    correctFeedback={correctFeedback?.[i]}
                                    incorrectFeedback={incorrectFeedback[i]}
                                    questionIndex={i}
                                    setSelectedChoiceIndex={
                                        setSelectedChoiceIndex
                                    }
                                    generatingFeedback={generatingFeedback}
                                />
                            )}
                        </>
                    )}
                    {correctFeedback?.[i] && (
                        <CollapsableText
                            style={{
                                color: "rgb(0, 255, 0)",
                            }}>
                            {correctFeedback[i].feedback}
                        </CollapsableText>
                    )}
                    {currentFeedback?.questionIndex === i &&
                        currentFeedback?.isCorrect && (
                            <CollapsableText
                                style={{
                                    color: "rgb(0, 255, 0)",
                                }}
                                collapsable={false}>
                                {currentFeedback.text}
                            </CollapsableText>
                        )}
                    {loading && currentQuestionNum === i && (
                        <h2>Thinking...</h2>
                    )}
                    {currentQuestionNum === i && questions[i] !== undefined && (
                        <>
                            {answerIsCorrect ? (
                                <>
                                    {currentQuestion.final ? (
                                        <FinishQuizButton
                                            generatingFeedback={
                                                generatingFeedback
                                            }
                                            onClick={() => {
                                                setExit(true);
                                            }}
                                        />
                                    ) : (
                                        <NextQuestionButton
                                            disabled={
                                                generatingFeedback ||
                                                generatingAnswer
                                            }
                                            onClick={() => {
                                                nextQuestion();
                                                setAnswer("");
                                                setSelectedChoiceIndex(
                                                    undefined
                                                );
                                            }}
                                        />
                                    )}
                                </>
                            ) : (
                                <SubmitAnswerButton
                                    disabled={
                                        !answer ||
                                        generatingFeedback ||
                                        generatingHint ||
                                        generatingAnswer ||
                                        (questions[i].type !== "written" &&
                                            selectedChoiceIndex === undefined)
                                    }
                                    onClick={() => {
                                        submitAnswer({
                                            answer,
                                            choiceIndex:
                                                questions[i].type === "written"
                                                    ? undefined
                                                    : selectedChoiceIndex,
                                            questionIndex: i,
                                        });
                                    }}
                                />
                            )}
                        </>
                    )}
                </CenteredColumn>
                <div ref={imageRef} />
            </CenteredRow>
        </CenteredColumn>
    );
}

export default Question;
