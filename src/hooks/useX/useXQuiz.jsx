import React from "react";
import useX from "./useX";
import { SocketContext, useSocket } from "../../context/SocketContext";

function useXQuiz({ lesson, ...props }) {
    const [questions, setQuestions] = React.useState([]);
    const [currentQuestionNum, setCurrentQuestionNum] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState(undefined);
    const [currentFeedbackIsCorrect, setCurrentFeedbackIsCorrect] =
        React.useState(undefined);
    const [generatingFeedback, setGeneratingFeedback] = React.useState(false);
    const [generatingHint, setGeneratingHint] = React.useState(false);
    const [hints, setHints] = React.useState([]);
    const [incorrectFeedback, setIncorrectFeedback] = React.useState([]);
    const [correctFeedback, setCorrectFeedback] = React.useState([]);
    const [currentFeedback, setCurrentFeedback] = React.useState("");
    const [currentHint, setCurrentHint] = React.useState("");
    const [finished, setFinished] = React.useState(false);
    const [answerIsCorrect, setAnswerIsCorrect] = React.useState(false);
    const [generatingAnswer, setGeneratingAnswer] = React.useState(false);
    const [currentAnswer, setCurrentAnswer] = React.useState("");
    const [answer, setAnswer] = React.useState("");

    const X = useX({
        channel: "quiz",
        ...props,
    });

    const { Socket } = useSocket();

    const submitAnswer = ({ answer, choiceIndex }) => {
        // console.log("SUBMITTING ANSWER: ", answer);
        // console.log("CHOICE INDEX: ", choiceIndex);
        X.sendMessage({
            message: answer,
            altChannel: "quiz_request_feedback",
            messageParams: {
                questionIndex: currentQuestionNum,
                choiceIndex,
                question: currentQuestion.raw,
            },
        });

        setGeneratingFeedback(true);
        setCurrentFeedbackIsCorrect(undefined);
    };

    const requestHint = () => {
        console.log("REQUESTING HINT");
        X.sendMessage({
            channel: "quiz_request_hint",
            messageParams: {
                questionIndex: currentQuestionNum,
                question: currentQuestion,
            },
        });
        setGeneratingHint(true);
    };

    const nextQuestion = () => {
        console.log("CHANGING QUESTION");
        setCurrentQuestionNum(prev => prev + 1);
        Socket.emit("quiz_change_question");
        setAnswerIsCorrect(false);
        X.resetAudio();

        if (!questions[currentQuestionNum + 1].final) {
            Socket.emit("quiz_generate_next_question");
        }
    };

    const onFeedbackStream = React.useCallback(
        ({ delta, questionIndex, choiceIndex, isCorrect }) => {
            X.setLoading(false);
            if (questionIndex === currentQuestionNum) {
                setCurrentFeedbackIsCorrect(isCorrect);
                setAnswerIsCorrect(isCorrect);
                setCurrentFeedback(prev =>
                    prev
                        ? { ...prev, text: prev.text + delta, isCorrect }
                        : {
                              questionIndex,
                              choiceIndex,
                              text: delta,
                              isCorrect,
                          }
                );
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off("quiz_feedback_stream");
        Socket.on("quiz_feedback_stream", onFeedbackStream);
    }, [onFeedbackStream]);

    const onNewFeedback = React.useCallback(
        ({ feedback, isCorrect, questionIndex, choiceIndex }) => {
            // console.log("RECEIVED FEEDBACK", feedback);
            // console.log(questionIndex, currentQuestionNum);
            if (questionIndex === currentQuestionNum) {
                setCurrentFeedback(undefined);
                setCurrentFeedbackIsCorrect(undefined);
                setGeneratingFeedback(false);
                setAnswerIsCorrect(isCorrect);
                if (
                    feedback.endsWith(
                        "A modal answer will be provided in the answer box."
                    )
                ) {
                    setGeneratingAnswer(true);
                }
                if (!isCorrect) {
                    setIncorrectFeedback(prev => {
                        if (!prev[questionIndex]) {
                            prev[questionIndex] = [];
                        }

                        if (choiceIndex !== undefined) {
                            prev[questionIndex][choiceIndex] = feedback;

                            return [...prev];
                        }

                        prev[questionIndex].push(feedback);

                        return [...prev];
                    });
                } else {
                    setCorrectFeedback(prev => {
                        prev[questionIndex] = {
                            feedback,
                            choiceIndex,
                        };
                        return [...prev];
                    });
                }
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off("quiz_new_feedback");
        Socket.on("quiz_new_feedback", onNewFeedback);
    }, [onNewFeedback]);

    const onHintStream = React.useCallback(
        ({ delta, questionIndex }) => {
            X.setLoading(false);
            if (questionIndex === currentQuestionNum) {
                setCurrentHint(prev => prev + delta);
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off("quiz_hint_stream");
        Socket.on("quiz_hint_stream", onHintStream);
    }, [onHintStream]);

    const onNewHint = React.useCallback(
        ({ hint, questionIndex }) => {
            if (questionIndex === currentQuestionNum) {
                setCurrentHint("");
                setHints(prev => {
                    prev[questionIndex].push(hint);
                    return [...prev];
                });
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off("quiz_new_hint");
        Socket.on("quiz_new_hint", onNewHint);
    }, [onNewHint]);

    const onAnswerStream = React.useCallback(
        ({ delta, questionIndex }) => {
            if (questionIndex === currentQuestionNum) {
                setGeneratingAnswer(true);
                setCurrentAnswer(prev => prev + delta);
                setAnswerIsCorrect(true);
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off("quiz_answer_stream");
        Socket.on("quiz_answer_stream", onAnswerStream);
    }, [onAnswerStream]);

    const onAnswer = React.useCallback(({ answer, questionIndex }) => {
        if (questionIndex === currentQuestionNum) {
            setCurrentAnswer("");
            setGeneratingAnswer(false);
            setAnswer(answer);
        }
    });

    React.useEffect(() => {
        Socket.off("quiz_answer");
        Socket.on("quiz_answer", onAnswer);
    }, [onAnswer]);

    React.useEffect(() => {
        if (!Socket) return;

        Socket.emit("start_quiz", { lesson });

        Socket.on("quiz_next_question", question => {
            console.log("RECEIVED QUESTION", question);
            setQuestions(prev => {
                const newQuestions = [...prev];
                newQuestions[question.questionNumber] = question;
                return newQuestions;
            });
            setFinished(question.final);
        });

        Socket.emit("quiz_generate_next_question");
        Socket.emit("quiz_generate_next_question");

        return () => {
            Socket.off("quiz_next_question");
            Socket.off("quiz_hint_stream");
            Socket.off("quiz_new_hint");
            Socket.off("quiz_feedback_stream");
            Socket.off("quiz_new_feedback");
        };
    }, []);

    React.useEffect(() => {
        setCurrentQuestion(questions[currentQuestionNum]);
    }, [currentQuestionNum, questions]);

    return {
        ...X,
        questions,
        nextQuestion,
        currentQuestionNum,
        currentQuestion,
        submitAnswer,
        generatingFeedback,
        generatingHint,
        requestHint,
        currentFeedbackIsCorrect,
        currentFeedback,
        currentHint,
        finished,
        incorrectFeedback,
        correctFeedback,
        answerIsCorrect,
        hints,
        generatingAnswer,
        currentAnswer,
        answer,
    };
}

export default useXQuiz;
