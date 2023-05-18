import React from "react";
import useX from "./useX";
import { SocketContext, useSocket } from "../../context/SocketContext";

function useXQuiz({ lesson, ...props }) {
    const [questions, setQuestions] = React.useState([]);
    const [currentQuestionNum, setCurrentQuestionNum] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState(undefined);

    const X = useX({
        channel: "quiz",
        ...props,
    });

    const { Socket } = useSocket();

    React.useEffect(() => {
        Socket.emit("start_quiz", { lesson });
        Socket.on("quiz_next_question", question => {
            setQuestions(prev => {
                const newQuestions = [...prev];
                newQuestions[question.number] = question;
                return newQuestions;
            });
        });

        return () => {
            Socket.off("quiz_next_question");
        };
    }, []);

    React.useEffect(() => {
        setCurrentQuestion(questions[currentQuestionNum]);
        Socket.emit("quiz_change_question", currentQuestionNum);
    }, [currentQuestionNum, questions]);

    const changeQuestion = questionIndex => {
        setCurrentQuestionNum(questionIndex);
    };

    return {
        ...X,
        questions,
        changeQuestion,
        currentQuestionNum,
        currentQuestion,
    };
}

export default useXQuiz;
