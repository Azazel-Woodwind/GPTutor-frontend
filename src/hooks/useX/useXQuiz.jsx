import React from "react";
import useX from "./useX";
import { SocketContext, useSocket } from "../../context/SocketContext";
import { QUESTIONS_PER_LEARNING_OBJECTIVE } from "../../lib/constants";

function useXQuiz({ lesson, channel, sendStart = true, ...props }) {
    const [questions, setQuestions] = React.useState([]);
    const [currentQuestionNum, setCurrentQuestionNum] = React.useState(0);
    const [generatingFeedback, setGeneratingFeedback] = React.useState(false);
    const [finished, setFinished] = React.useState(false);
    const [streamingAnswer, setStreamingAnswer] = React.useState(false);

    const scores = React.useRef([]);

    const X = useX({
        channel,
        ...props,
    });

    const { Socket } = useSocket();

    console.log("CURRENT QUESTION NUM: ", currentQuestionNum);

    const submitAnswer = ({ answer, choiceIndex, questionIndex, ...opts }) => {
        console.log("SUBMITTING ANSWER: ", answer);
        console.log("CHOICE INDEX: ", choiceIndex);
        X.sendMessage({
            message: choiceIndex !== undefined ? choiceIndex : answer,
            altChannel: `${channel}_request_feedback`,
            messageParams: {
                questionIndex: currentQuestionNum,
            },
            ...opts,
        });

        setGeneratingFeedback(true);
        // setCurrentFeedbackIsCorrect(undefined);
    };

    const changeQuestion = questionIndex => {
        console.log("CHANGING QUESTION");
        const newQuestionIndex = questionIndex || currentQuestionNum + 1;
        setCurrentQuestionNum(newQuestionIndex);
        Socket.emit(`${channel}_change_question`, newQuestionIndex);
        // setAnswerIsCorrect(false);
        X.resetAudio();
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
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off(`${channel}_feedback_stream`);
        Socket.on(`${channel}_feedback_stream`, onFeedbackStream);
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
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off(`${channel}_new_feedback`);
        Socket.on(`${channel}_new_feedback`, onNewFeedback);
    }, [onNewFeedback]);

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
        Socket.off(`${channel}_answer_stream`);
        Socket.on(`${channel}_answer_stream`, onAnswerStream);
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
            }
        },
        [currentQuestionNum]
    );

    React.useEffect(() => {
        Socket.off(`${channel}_answer`);
        Socket.on(`${channel}_answer`, onAnswer);
    }, [onAnswer]);

    React.useEffect(() => {
        if (!Socket || questions.length > 0) return;

        if (sendStart) {
            Socket.emit("start_quiz", { lesson });
        }

        Socket.on(`${channel}_next_question`, question => {
            console.log("RECEIVED QUESTION", question.questionIndex);
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
                newQuestions[question.questionIndex] = question;
                return newQuestions;
            });
            setFinished(question.final);
        });

        Socket.on(
            `${channel}_question_image`,
            ({ imageHTML, questionIndex }) => {
                console.log("RECEIVED IMAGE FOR QUESTION", questionIndex);
                setQuestions(prev => {
                    const newQuestions = [...prev];
                    newQuestions[questionIndex].imageHTML = imageHTML;
                    return newQuestions;
                });
            }
        );

        return () => {
            Socket.off(`${channel}_next_question`);
            Socket.off(`${channel}_hint_stream`);
            Socket.off(`${channel}_new_hint`);
            Socket.off(`${channel}_feedback_stream`);
            Socket.off(`${channel}_new_feedback`);
        };
    }, []);

    return {
        ...X,
        questions,
        changeQuestion,
        currentQuestionNum,
        submitAnswer,
        generatingFeedback,
        streamingAnswer,
        finished,
        getScore,
    };
}

export default useXQuiz;
