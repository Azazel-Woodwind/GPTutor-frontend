import React from "react";
import {
    useLoaderData,
    useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import useXQuiz from "../../hooks/useX/useXQuiz";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import useConversationDisplay from "../../hooks/useConversationDisplay";
import styled from "styled-components";
import { fade_animation } from "../../styles/FramerAnimations";
import EndOfQuizModal from "./components/EndOfQuizModal";
import { AnimatePresence, motion } from "framer-motion";
import GeneratingQuestion from "./components/GeneratingQuestion";
import WrittenQuestion from "./components/WrittenQuestion";
import MultipleChoiceQuestion from "./components/MultipleChoiceQuestion";
import FinishQuizButton from "./components/FinishQuizButton";
import NextQuestionButton from "./components/NextQuestionButton";
import SubmitAnswerButton from "./components/SubmitAnswerButton";
import Loading from "../Loading/Loading";
import { useHeader } from "../../context/HeaderContext";
import QuizHeader from "./components/QuizHeader";
import CollapsableText from "../../components/CollapsableText";

function Quiz() {
    useConversationDisplay(false);

    const lesson = useLoaderData();

    const [answer, setAnswer] = React.useState("");
    const [selectedChoiceIndex, setSelectedChoiceIndex] =
        React.useState(undefined);
    const [exit, setExit] = React.useState(false);

    const {
        questions,
        nextQuestion,
        currentQuestionNum,
        currentQuestion,
        incorrectFeedback,
        correctFeedback,
        currentFeedback,
        answerIsCorrect,
        generatingFeedback,
        submitAnswer,
        generatingHint,
        answer: modalAnswer,
        currentAnswer,
        generatingAnswer,
    } = useXQuiz({
        lesson,
    });

    React.useEffect(() => {
        setSelectedChoiceIndex(undefined);
    }, [incorrectFeedback]);

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

    const { setShowMainHeader } = useHeader();

    React.useEffect(() => {
        if (questions[0] || exit) {
            setShowMainHeader(false);
        }
        return () => {
            setShowMainHeader(true);
        };
    }, [questions, exit]);

    // console.log(generatingFeedback);

    const renderComponent = () => {
        if (!questions[0]) {
            return (
                <LoadingScreenWrapper key="loading" {...fade_animation()}>
                    <Loading
                        message="Generating Question #1..."
                        centered={false}
                    />
                </LoadingScreenWrapper>
            );
        }

        if (exit) {
            return <EndOfQuizModal key="endModal" />;
        }

        return (
            <Container key="quiz" {...fade_animation()}>
                <QuizHeader
                    lesson={lesson}
                    answerIsCorrect={answerIsCorrect}
                    currentQuestion={currentQuestion}
                    setExit={setExit}
                />
                {[...Array(currentQuestionNum + 1).keys()].map(i => (
                    <CenteredColumn
                        width="100vw"
                        style={{ padding: "1.25rem", minHeight: "100vh" }}
                        ref={callback}
                        key={i}>
                        <QuestionContainer
                            gap="1.25rem"
                            style={{ maxWidth: "60rem" }}>
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
                                            correctFeedback={
                                                correctFeedback?.[i]
                                            }
                                            incorrectFeedback={
                                                incorrectFeedback?.[i]
                                            }
                                            questionIndex={i}
                                            selectedChoiceIndex={
                                                selectedChoiceIndex
                                            }
                                            modalAnswer={modalAnswer}
                                            currentAnswer={currentAnswer}
                                        />
                                    ) : (
                                        <MultipleChoiceQuestion
                                            question={questions[i]}
                                            answer={answer}
                                            setAnswer={setAnswer}
                                            currentFeedback={currentFeedback}
                                            correctFeedback={
                                                correctFeedback?.[i]
                                            }
                                            incorrectFeedback={
                                                incorrectFeedback[i]
                                            }
                                            questionIndex={i}
                                            setSelectedChoiceIndex={
                                                setSelectedChoiceIndex
                                            }
                                            generatingFeedback={
                                                generatingFeedback
                                            }
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
                            {currentQuestionNum === i &&
                                questions[i] !== undefined && (
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
                                                    (questions[i].type !==
                                                        "written" &&
                                                        selectedChoiceIndex ===
                                                            undefined)
                                                }
                                                onClick={() => {
                                                    submitAnswer({
                                                        answer,
                                                        choiceIndex:
                                                            questions[i]
                                                                .type ===
                                                            "written"
                                                                ? undefined
                                                                : selectedChoiceIndex,
                                                    });
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                        </QuestionContainer>
                    </CenteredColumn>
                ))}
            </Container>
        );
    };

    return <AnimatePresence mode="wait">{renderComponent()}</AnimatePresence>;
}

const QuestionContainer = styled(CenteredColumn)``;

const Container = styled(motion.div)`
    font-size: 1.3rem;

    h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 2rem;
        text-align: center;
    }
`;

export const LoadingScreenWrapper = styled(motion.div)`
    /* height: 100%;
    width: 100%; */
`;

export default Quiz;
