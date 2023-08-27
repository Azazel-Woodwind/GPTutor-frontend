import React from "react";
import useX from "./useX";
import { SocketContext, useSocket } from "../../context/SocketContext";
import { QUESTIONS_PER_LEARNING_OBJECTIVE } from "../../lib/constants";

function useXQuiz({ lesson, ...props }) {
    const [questions, setQuestions] = React.useState([]);
    const [currentQuestionNum, setCurrentQuestionNum] = React.useState(0);
    // const [currentFeedbackIsCorrect, setCurrentFeedbackIsCorrect] =
    // React.useState(undefined);
    const [generatingFeedback, setGeneratingFeedback] = React.useState(false);
    // const [generatingHint, setGeneratingHint] = React.useState(false);
    // const [hints, setHints] = React.useState([]);
    // const [incorrectFeedback, setIncorrectFeedback] = React.useState([]);
    // const [correctFeedback, setCorrectFeedback] = React.useState([]);
    // const [currentFeedback, setCurrentFeedback] = React.useState("");
    // const [currentHint, setCurrentHint] = React.useState("");
    const [finished, setFinished] = React.useState(false);
    // const [answerIsCorrect, setAnswerIsCorrect] = React.useState(false);
    // const [generatingAnswer, setGeneratingAnswer] = React.useState(false);
    // const [currentAnswer, setCurrentAnswer] = React.useState("");
    // const [answer, setAnswer] = React.useState("");
    const [streamingAnswer, setStreamingAnswer] = React.useState(false);

    const scores = React.useRef([]);

    const X = useX({
        channel: "quiz",
        ...props,
    });

    const { Socket } = useSocket();

    const submitAnswer = ({ answer, choiceIndex, questionIndex }) => {
        // console.log("SUBMITTING ANSWER: ", answer);
        // console.log("CHOICE INDEX: ", choiceIndex);
        X.sendMessage({
            message: choiceIndex !== undefined ? "" + choiceIndex : answer,
            altChannel: "quiz_request_feedback",
            messageParams: {
                questionIndex: currentQuestionNum,
                choiceIndex,
                question: questions[currentQuestionNum].questionString,
            },
        });

        setGeneratingFeedback(true);
        // setCurrentFeedbackIsCorrect(undefined);
    };

    // const requestHint = () => {
    //     console.log("REQUESTING HINT");
    //     X.sendMessage({
    //         channel: "quiz_request_hint",
    //         messageParams: {
    //             questionIndex: currentQuestionNum,
    //             question: currentQuestion,
    //         },
    //     });
    //     setGeneratingHint(true);
    // };

    const nextQuestion = () => {
        console.log("CHANGING QUESTION");
        setCurrentQuestionNum(prev => prev + 1);
        Socket.emit("quiz_change_question");
        // setAnswerIsCorrect(false);
        X.resetAudio();

        if (!questions[currentQuestionNum + 1].final) {
            Socket.emit("quiz_generate_next_question");
        }
    };

    function getScore() {
        const score = scores.current.reduce((acc, curr) => acc + curr, 0);
        const maxScore = questions.reduce((acc, curr) => acc + curr.marks, 0);

        console.log(`SCORE: ${score}/${maxScore}`);
        // console.log(scores.current);
        return {
            score,
            maxScore,
        };
    }

    const onFeedbackStream = React.useCallback(
        ({
            delta,
            questionIndex,
            choiceIndex,
            isCorrect,
            marksScored,
            type,
            first,
        }) => {
            X.setLoading(false);
            if (questionIndex === currentQuestionNum) {
                setGeneratingFeedback(true);
                if (type === "multiple") {
                    setQuestions(prev => {
                        const newQuestions = [...prev];
                        if (first) {
                            newQuestions[questionIndex].marksScored =
                                Number(isCorrect);
                        }

                        if (isCorrect) {
                            newQuestions[questionIndex].correctFeedback +=
                                delta;
                        } else {
                            newQuestions[questionIndex].choices[
                                choiceIndex
                            ].incorrectFeedback += delta;
                        }
                        return newQuestions;
                    });
                } else {
                    setQuestions(prev => {
                        const newQuestions = [...prev];
                        if (first) {
                            newQuestions[questionIndex].feedback = delta;
                            newQuestions[questionIndex].marksScored =
                                marksScored;
                        } else {
                            newQuestions[questionIndex].feedback += delta;
                        }
                        return newQuestions;
                    });
                }
                // setCurrentFeedbackIsCorrect(isCorrect);
                // setAnswerIsCorrect(isCorrect);
                // setCurrentFeedback(prev =>
                //     prev
                //         ? { ...prev, text: prev.text + delta, isCorrect }
                //         : {
                //               questionIndex,
                //               choiceIndex,
                //               text: delta,
                //               isCorrect,
                //           }
                // );
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off("quiz_feedback_stream");
        Socket.on("quiz_feedback_stream", onFeedbackStream);
    }, [onFeedbackStream]);

    const onNewFeedback = React.useCallback(
        ({
            feedback,
            isCorrect,
            questionIndex,
            choiceIndex,
            final,
            type,
            marksScored,
        }) => {
            if (questionIndex === currentQuestionNum) {
                if (!scores.current[questionIndex]) {
                    if (type === "multiple") {
                        scores.current[questionIndex] = Number(isCorrect);
                    } else {
                        scores.current[questionIndex] = marksScored;
                    }
                }

                setGeneratingFeedback(false);
                if (type === "multiple") {
                    setQuestions(prev => {
                        const newQuestions = [...prev];
                        if (isCorrect) {
                            newQuestions[questionIndex].correctFeedback =
                                feedback;
                            newQuestions[questionIndex].finished = true;
                        } else {
                            newQuestions[questionIndex].choices[
                                choiceIndex
                            ].incorrectFeedback = feedback;
                        }
                        return newQuestions;
                    });
                } else {
                    // if (final) {
                    //     setGeneratingAnswer(true);
                    // }
                    setQuestions(prev => {
                        const newQuestions = [...prev];
                        newQuestions[questionIndex].feedback = feedback;
                        newQuestions[questionIndex].marksScored = marksScored;
                        if (marksScored === newQuestions[questionIndex].marks) {
                            newQuestions[questionIndex].finished = true;
                        }
                        return newQuestions;
                    });
                }
                // setCurrentFeedback(undefined);
                // setCurrentFeedbackIsCorrect(undefined);
                // setAnswerIsCorrect(isCorrect);

                // if (!isCorrect) {
                //     setIncorrectFeedback(prev => {
                //         if (!prev[questionIndex]) {
                //             prev[questionIndex] = [];
                //         }

                //         if (choiceIndex !== undefined) {
                //             prev[questionIndex][choiceIndex] = feedback;

                //             return [...prev];
                //         }

                //         prev[questionIndex].push(feedback);

                //         return [...prev];
                //     });
                // } else {
                //     setCorrectFeedback(prev => {
                //         prev[questionIndex] = {
                //             feedback,
                //             choiceIndex,
                //         };
                //         return [...prev];
                //     });
                // }
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off("quiz_new_feedback");
        Socket.on("quiz_new_feedback", onNewFeedback);
    }, [onNewFeedback]);

    // const onHintStream = React.useCallback(
    //     ({ delta, questionIndex }) => {
    //         X.setLoading(false);
    //         if (questionIndex === currentQuestionNum) {
    //             setCurrentHint(prev => prev + delta);
    //         }
    //     },
    //     [currentQuestionNum]
    // );

    // React.useEffect(() => {
    //     Socket.off("quiz_hint_stream");
    //     Socket.on("quiz_hint_stream", onHintStream);
    // }, [onHintStream]);

    // const onNewHint = React.useCallback(
    //     ({ hint, questionIndex }) => {
    //         if (questionIndex === currentQuestionNum) {
    //             setCurrentHint("");
    //             setHints(prev => {
    //                 prev[questionIndex].push(hint);
    //                 return [...prev];
    //             });
    //         }
    //     },
    //     [currentQuestionNum]
    // );

    // React.useEffect(() => {
    //     Socket.off("quiz_new_hint");
    //     Socket.on("quiz_new_hint", onNewHint);
    // }, [onNewHint]);

    const onAnswerStream = React.useCallback(
        ({ delta, questionIndex }) => {
            if (questionIndex === currentQuestionNum) {
                setStreamingAnswer(true);
                setQuestions(prev => {
                    const newQuestions = [...prev];
                    newQuestions[questionIndex].modalAnswer += delta;
                    return newQuestions;
                });
                // setCurrentAnswer(prev => prev + delta);
                // setAnswerIsCorrect(true);
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off("quiz_answer_stream");
        Socket.on("quiz_answer_stream", onAnswerStream);
    }, [onAnswerStream]);

    const onAnswer = React.useCallback(
        ({ answer, questionIndex }) => {
            if (questionIndex === currentQuestionNum) {
                setStreamingAnswer(false);
                setQuestions(prev => {
                    const newQuestions = [...prev];
                    newQuestions[questionIndex].modalAnswer = answer;
                    newQuestions[questionIndex].finished = true;
                    return newQuestions;
                });
                // setCurrentAnswer("");
                // setGeneratingAnswer(false);
                // setAnswer({ answer, questionIndex });
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off("quiz_answer");
        Socket.on("quiz_answer", onAnswer);
    }, [onAnswer]);

    React.useEffect(() => {
        if (!Socket || questions.length > 0) return;

        Socket.emit("start_quiz", { lesson });

        Socket.on("quiz_next_question", question => {
            console.log("RECEIVED QUESTION", question.questionNumber);
            setQuestions(prev => {
                const newQuestions = [...prev];
                question.marksScored = undefined;
                if (question.type === "multiple") {
                    question.choices = question.choices.map(choice => ({
                        text: choice,
                        incorrectFeedback: "",
                    }));
                    question.correctFeedback = "";
                } else {
                    question.feedback = "";
                    question.modalAnswer = "";
                }
                newQuestions[question.questionNumber] = question;
                return newQuestions;
            });
            setFinished(question.final);
        });

        Socket.on("quiz_question_image", ({ imageHTML, questionNumber }) => {
            console.log("RECEIVED IMAGE FOR QUESTION", questionNumber);
            setQuestions(prev => {
                const newQuestions = [...prev];
                newQuestions[questionNumber].imageHTML = imageHTML;
                return newQuestions;
            });
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

    // React.useEffect(() => {
    //     setCurrentQuestion(questions[currentQuestionNum]);
    // }, [currentQuestionNum, questions]);

    return {
        ...X,
        questions,
        nextQuestion,
        currentQuestionNum,
        submitAnswer,
        generatingFeedback,
        streamingAnswer,
        // generatingHint,
        // requestHint,
        // currentFeedbackIsCorrect,
        // currentFeedback,
        // currentHint,
        finished,
        // incorrectFeedback,
        // correctFeedback,
        // answerIsCorrect,
        // hints,
        // generatingAnswer,
        // currentAnswer,
        // answer,
        getScore,
    };
}

export default useXQuiz;
