import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useXQuiz from "../../../hooks/useX/useXQuiz";
import useConversationDisplay from "../../../hooks/useConversationDisplay";
import styled from "styled-components";
import EndOfQuizModal from "./components/EndOfQuizModal";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "@/components/common/feedback/Loading";
import { useHeader } from "../../../context/HeaderContext";
import QuizHeader from "./components/QuizHeader";
import QuizAPI from "../../../api/QuizAPI";
import Question from "./components/Question";
import { fade_animation } from "@/lib/animation";

/**
 * The Quiz environment, where the user is tested on a lesson by X.
 *
 * @page
 * @route /quiz/:lessonName?id=:lessonId
 * @accessLevel 1 - Student
 * @returns {JSX.Element} - A page of quiz questions.
 */
function Quiz() {
    useConversationDisplay(false);

    const lesson = useLoaderData();

    const [exit, setExit] = React.useState(false);

    const navigate = useNavigate();

    const {
        questions,
        changeQuestion,
        currentQuestionNum,
        generatingFeedback,
        submitAnswer,
        getScore,
        loading,
        streamingAnswer,
    } = useXQuiz({
        lesson,
        channel: "quiz",
    });

    const { setShowMainHeader } = useHeader();

    React.useEffect(() => {
        if (questions[0] || exit) {
            setShowMainHeader(false);
        }
        return () => {
            setShowMainHeader(true);
        };
    }, [questions, exit]);

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
                            score: getScore(),
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
                    currentQuestion={questions[currentQuestionNum]}
                    setExit={setExit}
                />
                {[...Array(currentQuestionNum + 1).keys()].map(i => (
                    <Question
                        key={i}
                        i={i}
                        questions={questions}
                        submitAnswer={submitAnswer}
                        currentQuestionNum={currentQuestionNum}
                        generatingFeedback={generatingFeedback}
                        changeQuestion={changeQuestion}
                        loading={loading}
                        setExit={setExit}
                        streamingAnswer={streamingAnswer}
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
        font-size: 2.3em;
    }

    h2 {
        font-size: 2em;
        font-weight: normal;
        /* text-align: center; */
    }
`;

export const LoadingScreenWrapper = styled(motion.div)`
    /* height: 100%;
    width: 100%; */
`;

export default Quiz;
