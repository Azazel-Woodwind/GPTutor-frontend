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
import { interpolateColor } from "../../../lib/misc";
import { useTheme } from "styled-components";

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
    submitAnswer,
    currentQuestionNum,
    generatingFeedback,
    nextQuestion,
    loading,
    setExit,
    streamingAnswer,
}) {
    const [selectedChoiceIndex, setSelectedChoiceIndex] =
        React.useState(undefined);
    const [answer, setAnswer] = React.useState("");

    const imageRef = React.useRef(null);

    const theme = useTheme();

    React.useEffect(() => {
        // console.log("QUESTION HTML:", questions[i]?.imageHTML);
        if (!questions[i]?.imageHTML || imageRef.current.shadowRoot) return;

        const shadowRoot = imageRef.current.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = questions[i]?.imageHTML;
    }, [questions[i]?.imageHTML]);

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

    // console.log(questions[i]);

    return (
        <CenteredColumn
            width="100vw"
            style={{
                minHeight: "100vh",
                padding: "1.25em 0",
                // minHeight?
            }}
            ref={callback}
            key={i}>
            <CenteredRow
                wrap
                fillparent
                gap="1.3em"
                style={
                    {
                        // padding: "1.25em",
                        // paddingLeft: "2em",
                    }
                }>
                <CenteredColumn
                    gap="0.5em"
                    style={{ width: "60em", alignItems: "start" }}>
                    {questions[i] === undefined ? (
                        <GeneratingQuestion />
                    ) : (
                        <>
                            <h1>
                                Question #{i + 1}{" "}
                                <span
                                    style={{
                                        color:
                                            questions[i]?.marksScored !==
                                            undefined
                                                ? interpolateColor(
                                                      questions[i].marksScored /
                                                          questions[i].marks,
                                                      theme.colours.error,
                                                      theme.colours.correct
                                                  )
                                                : "white",
                                    }}>
                                    (
                                    {questions[i]?.marksScored !== undefined
                                        ? `${questions[i].marksScored}/${questions[i].marks}`
                                        : `${questions[i].marks} mark${
                                              questions[i].marks === 1
                                                  ? ""
                                                  : "s"
                                          }`}
                                    )
                                </span>
                            </h1>
                            {questions[i].type === "written" ? (
                                <WrittenQuestion
                                    question={questions[i]}
                                    answer={answer}
                                    setAnswer={setAnswer}
                                    submitAnswer={submitAnswer}
                                    loading={loading}
                                    questionIndex={i}
                                />
                            ) : (
                                <MultipleChoiceQuestion
                                    question={questions[i]}
                                    questionIndex={i}
                                    setSelectedChoiceIndex={
                                        setSelectedChoiceIndex
                                    }
                                    generatingFeedback={generatingFeedback}
                                    selectedChoiceIndex={selectedChoiceIndex}
                                    currentQuestionNum={currentQuestionNum}
                                />
                            )}
                        </>
                    )}
                    {questions[i]?.correctFeedback && (
                        <CollapsableText
                            style={{
                                color: theme.colours.correct,
                            }}>
                            {questions[i]?.correctFeedback}
                        </CollapsableText>
                    )}
                    {questions[i]?.feedback && (
                        <CollapsableText
                            style={{
                                color: interpolateColor(
                                    questions[i].marksScored /
                                        questions[i].marks,
                                    theme.colours.error,
                                    theme.colours.correct
                                ),
                            }}>
                            {questions[i]?.feedback}
                        </CollapsableText>
                    )}
                    {/* {correctFeedback?.[i] && (
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
                        )} */}
                    {loading && currentQuestionNum === i && (
                        <div style={{ margin: "auto" }}>
                            <h2>Thinking...</h2>
                        </div>
                    )}
                    {currentQuestionNum === i && questions[i] && (
                        <>
                            {questions[i].finished ? (
                                <>
                                    {questions[i].final ? (
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
                                                streamingAnswer
                                            }
                                            onClick={() => {
                                                nextQuestion();
                                                // setAnswer("");
                                                // setSelectedChoiceIndex(
                                                //     undefined
                                                // );
                                            }}
                                        />
                                    )}
                                </>
                            ) : (
                                <SubmitAnswerButton
                                    disabled={
                                        generatingFeedback ||
                                        streamingAnswer ||
                                        (questions[i].type === "multiple" &&
                                            selectedChoiceIndex === undefined)
                                    }
                                    onClick={() => {
                                        submitAnswer({
                                            answer,
                                            choiceIndex:
                                                questions[i].type === "written"
                                                    ? undefined
                                                    : selectedChoiceIndex,
                                        });
                                    }}
                                />
                            )}
                        </>
                    )}
                </CenteredColumn>
                {!questions[i]?.imageHTML ? (
                    <div
                        style={{
                            height: "350px",
                            width: "550px",
                            backgroundColor: "white",
                            color: "black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <h2>Generating image...</h2>
                    </div>
                ) : (
                    <div
                        style={{ backgroundColor: "white", color: "black" }}
                        ref={imageRef}
                    />
                )}
            </CenteredRow>
        </CenteredColumn>
    );
}

export default Question;
