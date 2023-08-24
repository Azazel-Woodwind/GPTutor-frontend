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
import QuizAPI from "../../api/QuizAPI";
import CenteredRow from "../../styles/containers/CenteredRow";
import Question from "./components/Question";

function Quiz() {
    useConversationDisplay(false);

    const lesson = useLoaderData();

    const [answer, setAnswer] = React.useState("");
    const [selectedChoiceIndex, setSelectedChoiceIndex] =
        React.useState(undefined);
    const [exit, setExit] = React.useState(false);

    const navigate = useNavigate();

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
        getScore,
        loading,
    } = useXQuiz({
        lesson,
    });

    React.useEffect(() => {
        setSelectedChoiceIndex(undefined);
    }, [incorrectFeedback]);

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
            return (
                <EndOfQuizModal
                    key="endModal"
                    score={getScore()}
                    onExit={async () => {
                        QuizAPI.saveScore({
                            lesson,
                            score: getScore().correctAnswers,
                        });
                        navigate("/hub");
                    }}
                />
            );
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
                    <Question
                        key={i}
                        i={i}
                        questions={questions}
                        answer={answer}
                        setAnswer={setAnswer}
                        submitAnswer={submitAnswer}
                        currentFeedback={currentFeedback}
                        correctFeedback={correctFeedback}
                        incorrectFeedback={incorrectFeedback}
                        currentQuestionNum={currentQuestionNum}
                        selectedChoiceIndex={selectedChoiceIndex}
                        setSelectedChoiceIndex={setSelectedChoiceIndex}
                        generatingFeedback={generatingFeedback}
                        generatingHint={generatingHint}
                        generatingAnswer={generatingAnswer}
                        answerIsCorrect={answerIsCorrect}
                        nextQuestion={nextQuestion}
                        loading={loading}
                        modalAnswer={modalAnswer}
                        currentAnswer={currentAnswer}
                        currentQuestion={currentQuestion}
                    />
                ))}
            </Container>
        );
    };

    return <AnimatePresence mode="wait">{renderComponent()}</AnimatePresence>;
}

const Container = styled(motion.div)`
    font-size: 0.9rem;

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
