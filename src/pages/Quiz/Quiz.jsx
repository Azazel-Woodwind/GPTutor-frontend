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
import CorrectFeedback from "./components/CorrectFeedback";
import FinishQuizButton from "./components/FinishQuizButton";
import NextQuestionButton from "./components/NextQuestionButton";
import SubmitAnswerButton from "./components/SubmitAnswerButton";
import QuizHeaderContent from "./components/QuizHeaderContent";
import Loading from "../Loading/Loading";

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

    const navigate = useNavigate();

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
            <motion.div key="quiz" {...fade_animation()}>
                <QuizHeaderContent
                    lesson={lesson}
                    answerIsCorrect={answerIsCorrect}
                    currentQuestion={currentQuestion}
                    setExit={setExit}
                />
                {[...Array(currentQuestionNum + 1).keys()].map(i => (
                    <CenteredColumn
                        gap="20px"
                        height="100vh"
                        style={{ padding: "20px" }}
                        ref={callback}
                        key={i}>
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
                            <CorrectFeedback
                                correctFeedback={correctFeedback[i].feedback}
                            />
                        )}
                        {currentFeedback?.questionIndex === i &&
                            currentFeedback?.isCorrect && (
                                <CorrectFeedback
                                    correctFeedback={currentFeedback.text}
                                />
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
                                                        questions[i].type ===
                                                        "written"
                                                            ? undefined
                                                            : selectedChoiceIndex,
                                                });
                                            }}
                                        />
                                    )}
                                </>
                            )}
                    </CenteredColumn>
                ))}
            </motion.div>
        );
    };

    return <AnimatePresence mode="wait">{renderComponent()}</AnimatePresence>;
}

const LoadingScreenWrapper = styled(motion.div)`
    height: 100%;
    width: 100%;
`;

export default Quiz;
