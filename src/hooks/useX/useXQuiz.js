import React from "react";
import useX from "./useX";
import { useSocket } from "../../context/SocketContext";

function useXQuiz({ lesson, channel, sendStart = true, ...props }) {
    const [questions, setQuestions] = React.useState([]);
    const [currentQuestionNum, setCurrentQuestionNum] = React.useState(0);
    const [generatingFeedback, setGeneratingFeedback] = React.useState(false);
    const [streamingAnswer, setStreamingAnswer] = React.useState(false);

    const scores = React.useRef([]);

    const X = useX({
        channel,
        ...props,
    });

    const { Socket } = useSocket();

    // console.log("CURRENT QUESTION NUM: ", currentQuestionNum);

    const submitAnswer = ({ answer, choiceIndex, questionIndex, ...opts }) => {
        console.log("SUBMITTING ANSWER: ", answer);
        console.log("CHOICE INDEX: ", choiceIndex);
        const altChannel =
            choiceIndex !== undefined
                ? `${channel}_request_multiple_choice_feedback`
                : `${channel}_request_written_feedback`;
        console.log(altChannel);
        X.sendMessage({
            message: choiceIndex !== undefined ? choiceIndex : answer,
            altChannel,
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
        let newQuestionIndex = questionIndex;
        if (
            questionIndex === undefined ||
            questionIndex === null ||
            questionIndex === false
        ) {
            newQuestionIndex = currentQuestionNum + 1;
        }
        setCurrentQuestionNum(newQuestionIndex);
        console.log("CHANGING QUESTION TO: ", newQuestionIndex);
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

    const onWrittenFeedbackStream = React.useCallback(
        ({ currentFeedback, questionIndex, marksScored }) => {
            X.setLoading(false);
            if (questionIndex === currentQuestionNum) {
                setGeneratingFeedback(true);
                setQuestions(prev => {
                    const newQuestions = [...prev];
                    newQuestions[questionIndex].marksScored = marksScored;
                    newQuestions[questionIndex].feedback = currentFeedback;
                    return newQuestions;
                });
            }
        },
        [currentQuestionNum]
    );

    const onMultipleChoiceFeedbackStream = React.useCallback(
        ({ currentFeedback, questionIndex, choiceIndex, isCorrect }) => {
            X.setLoading(false);
            if (questionIndex === currentQuestionNum) {
                setGeneratingFeedback(true);
                setQuestions(prev => {
                    const newQuestions = [...prev];
                    newQuestions[questionIndex].marksScored = Number(isCorrect);

                    if (isCorrect) {
                        newQuestions[questionIndex].correctFeedback =
                            currentFeedback;
                    } else {
                        newQuestions[questionIndex].choices[
                            choiceIndex
                        ].incorrectFeedback = currentFeedback;
                    }
                    return newQuestions;
                });
            }
        },
        [currentQuestionNum]
    );

    // console.log(currentQuestionNum);

    const onNewWrittenFeedback = React.useCallback(
        ({ feedback, questionIndex, marksScored }) => {
            console.log(questionIndex, currentQuestionNum);
            if (questionIndex === currentQuestionNum) {
                if (!scores.current[questionIndex]) {
                    scores.current[questionIndex] = marksScored;
                }
                console.log("ON NEW WRITTEN FEEDBACK");

                setGeneratingFeedback(false);
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
        },
        [currentQuestionNum]
    );

    const onNewMultipleChoiceFeedback = React.useCallback(
        ({ feedback, isCorrect, questionIndex, choiceIndex }) => {
            if (questionIndex === currentQuestionNum) {
                if (!scores.current[questionIndex]) {
                    scores.current[questionIndex] = Number(isCorrect);
                }

                setGeneratingFeedback(false);
                setQuestions(prev => {
                    const newQuestions = [...prev];
                    if (isCorrect) {
                        newQuestions[questionIndex].correctFeedback = feedback;
                        newQuestions[questionIndex].finished = true;
                    } else {
                        newQuestions[questionIndex].choices[
                            choiceIndex
                        ].incorrectFeedback = feedback;
                    }
                    return newQuestions;
                });
            }
        },
        [currentQuestionNum]
    );

    const onAnswerStream = React.useCallback(
        ({ currentAnswer, questionIndex }) => {
            if (questionIndex === currentQuestionNum) {
                setStreamingAnswer(true);
                setQuestions(prev => {
                    const newQuestions = [...prev];
                    newQuestions[questionIndex].modalAnswer = currentAnswer;
                    return newQuestions;
                });
            }
        },
        [currentQuestionNum]
    );

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

    const onFullResponse = React.useCallback(
        instruction => {
            console.log("FULL RESPONSE:", instruction.feedback);
            const context = instruction.context;
            console.log("INSTRUCTION:", instruction);
            switch (context) {
                case "new_feedback":
                    if (instruction.questionType === "written") {
                        console.log("here");
                        onNewWrittenFeedback({
                            ...instruction,
                        });
                    } else {
                        onNewMultipleChoiceFeedback({
                            ...instruction,
                        });
                    }
                    break;
                case "new_answer":
                    onAnswer({ ...instruction });
                    break;
            }
        },
        [onNewWrittenFeedback, onNewMultipleChoiceFeedback, onAnswer]
    );

    const onCurrentMessageChange = React.useCallback(
        ({ currentMessage, ...instruction }) => {
            const context = instruction.context;
            switch (context) {
                case "feedback_stream":
                    if (instruction.questionType === "written") {
                        onWrittenFeedbackStream({
                            currentFeedback: currentMessage,
                            ...instruction,
                        });
                    } else {
                        onMultipleChoiceFeedbackStream({
                            currentFeedback: currentMessage,
                            ...instruction,
                        });
                    }
                    break;
                case "answer_stream":
                    onAnswerStream({
                        currentAnswer: currentMessage,
                        ...instruction,
                    });
                    break;
            }
        },
        [
            onWrittenFeedbackStream,
            onMultipleChoiceFeedbackStream,
            onAnswerStream,
        ]
    );

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
                if (question.questionType === "multiple") {
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

    React.useEffect(() => {
        X.setOnCurrentMessageChange(onCurrentMessageChange);
    }, [onCurrentMessageChange]);

    React.useEffect(() => {
        X.setOnFullResponse(onFullResponse);
    }, [onFullResponse]);

    return {
        ...X,
        questions,
        changeQuestion,
        currentQuestionNum,
        submitAnswer,
        generatingFeedback,
        streamingAnswer,
        getScore,
        setCurrentQuestionNum,
    };
}

export default useXQuiz;
