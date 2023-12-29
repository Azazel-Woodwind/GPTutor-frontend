import React from "react";
import CenteredColumn from "@/components/common/layout/CenteredColumn";
import GeneratingQuestion from "./GeneratingQuestion";
import WrittenQuestion from "./WrittenQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import { useTheme } from "styled-components";
import NextQuestionButton from "./NextQuestionButton";
import SubmitAnswerButton from "./SubmitAnswerButton";
import { interpolateColor } from "@/utils/css";
import CollapsableText from "@/components/common/dataDisplay/CollapsableText";

/**
 * QuizQuestion - A component for rendering individual quiz questions, including written and multiple choice questions.
 * It handles displaying the question, user responses, feedback, and navigation through the quiz.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.questions - The array of questions in the quiz.
 * @param {number} props.i - The index of the current question in the quiz.
 * @param {Function} props.submitAnswer - Function to submit the answer to the question.
 * @param {boolean} props.generatingFeedback - Indicates if feedback is being generated for the question.
 * @param {Function} props.changeQuestion - Function to change to the next question in the quiz.
 * @param {boolean} props.loading - Indicates if the question is in the loading state.
 * @param {boolean} props.streamingAnswer - Indicates if the answer is being streamed (e.g., voice input).
 * @param {number} props.currentQuestionNum - The number of the current question being displayed.
 * @param {string} props.answer - The current answer input by the user.
 * @param {Function} props.setAnswer - Function to set the user's answer.
 * @param {number} props.selectedChoiceIndex - The index of the selected choice in a multiple choice question.
 * @param {Function} props.setSelectedChoiceIndex - Function to set the selected choice index.
 * @param {React.Component} props.finalQuestionButton - The button displayed for the final question in the quiz.
 * @returns {React.Component} Component representing an individual quiz question with its functionality.
 */
function QuizQuestion({
    questions,
    i,
    submitAnswer,
    generatingFeedback,
    changeQuestion,
    loading,
    streamingAnswer,
    currentQuestionNum,
    answer,
    setAnswer,
    selectedChoiceIndex,
    setSelectedChoiceIndex,
    finalQuestionButton,
}) {
    const theme = useTheme();
    // console.log(questions[i].type);
    // console.log(selectedChoiceIndex);
    // console.log(generatingFeedback);

    const [isAnswerChanged,setIsAnswerChanged] =  React.useState(false)


    const submitDisabled = (question) => {
        if(generatingFeedback || streamingAnswer) return true;
        
        let shouldDisableSubmit = false;
        switch (question.questionType) {
            case 'multiple':
                shouldDisableSubmit = (selectedChoiceIndex === undefined ||
                    question?.choices[
                        selectedChoiceIndex
                    ]?.incorrectFeedback);
                break;
            case 'written':                
                shouldDisableSubmit =  answer?.trim()?.length === 0 || (question.feedback && !isAnswerChanged)
                break;
            default:
                shouldDisableSubmit = false;
                break;
        }

        return shouldDisableSubmit;
                                    
    }

    return (
        <CenteredColumn
            // border
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
                                    questions[i]?.marksScored !== undefined
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
                                      questions[i].marks === 1 ? "" : "s"
                                  }`}
                            )
                        </span>
                    </h1>
                    {questions[i].questionType === "written" ? (
                        <WrittenQuestion
                            question={questions[i]}
                            answer={answer}
                            setAnswer={setAnswer}
                            setIsAnswerChanged={setIsAnswerChanged}
                            submitDisabled={submitDisabled}
                            submitAnswer={submitAnswer}
                            loading={loading}
                        />
                    ) : (
                        <MultipleChoiceQuestion
                            question={questions[i]}
                            questionIndex={i}
                            setSelectedChoiceIndex={setSelectedChoiceIndex}
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
                            questions[i].marksScored / questions[i].marks,
                            theme.colours.error,
                            theme.colours.correct
                        ),
                    }}>
                    {questions[i]?.feedback}
                </CollapsableText>
            )}
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
                                <>{finalQuestionButton}</>
                            ) : (
                                <NextQuestionButton
                                    disabled={
                                        generatingFeedback || streamingAnswer
                                    }
                                    onClick={() => {
                                        changeQuestion();
                                    }}
                                />
                            )}
                        </>
                    ) : (
                        <SubmitAnswerButton
                            disabled={submitDisabled(questions[i])}
                            onClick={() => {
                                setIsAnswerChanged(false)
                                submitAnswer({
                                    includeInHistory: false,
                                    answer,
                                    choiceIndex:
                                        questions[i].questionType === "written"
                                            ? undefined
                                            : selectedChoiceIndex,
                                });
                                // setSelectedChoiceIndex(undefined);
                            }}
                        />
                    )}
                </>
            )}
        </CenteredColumn>
    );
}

export default QuizQuestion;
