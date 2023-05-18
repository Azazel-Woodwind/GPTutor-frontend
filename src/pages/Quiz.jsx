import React from "react";
import { useLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";
import useXQuiz from "../hooks/useX/useXQuiz";
import GeneratingQuestionModal from "../components/Quiz/GeneratingQuestionModal";
import CenteredColumn from "../styles/containers/CenteredColumn";
import Textfield from "../components/Textfield";
import RadioButton from "../components/RadioButton";
import CustomButton from "../components/Button";
import useConversationDisplay from "../hooks/useConversationDisplay";

function Quiz() {
    useConversationDisplay(false);

    const lesson = useLoaderData();

    const [writtenQuestionAnswer, setWrittenQuestionAnswer] =
        React.useState("");
    const [selectedChoice, setSelectedChoice] = React.useState(null);

    const [answer, setAnswer] = React.useState("");
    const [generatingFeedback, setGeneratingFeedback] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState(undefined);
    const [incorrectFeedback, setIncorrectFeedback] = React.useState([]);
    const [correctFeedback, setCorrectFeedback] = React.useState([]);

    const {
        questions,
        changeQuestion,
        currentQuestionNum,
        currentQuestion,
        sendMessage,
        currentMessage,
    } = useXQuiz({
        lesson,
        onMessage: ({ correct, response, questionIndex, choiceIndex }) => {
            console.log(questionIndex);
            if (correct) {
                setCorrectFeedback(prev => {
                    const newFeedback = [...prev];
                    newFeedback[questionIndex] = response;
                    return newFeedback;
                });
            } else {
                if (questions[questionIndex].type === "written") {
                    setIncorrectFeedback(prev => {
                        const newFeedback = [...prev];
                        newFeedback[questionIndex].append(response);
                        return newFeedback;
                    });
                } else {
                    setIncorrectFeedback(prev => {
                        const newFeedback = [...prev];
                        newFeedback[questionIndex][choiceIndex] = response;
                        return newFeedback;
                    });
                }
            }
        },
    });

    React.useEffect(() => {
        if (questions.length === 0) return;
        setIncorrectFeedback(prev => [...prev, []]);
        setCorrectFeedback(prev => [...prev, []]);
    }, [questions]);

    React.useEffect(() => {
        if (!currentMessage) {
            setIsCorrect(undefined);
            setGeneratingFeedback(false);
            return;
        }
        if (isCorrect !== undefined) return;

        if (currentMessage.startsWith("CORRECT")) {
            setIsCorrect(true);
        }
        if (currentMessage.startsWith("INCORRECT")) {
            setIsCorrect(false);
        }
    }, [currentMessage]);

    const goToPrevQuestion = () => {
        if (currentQuestionNum === 0) return;
        changeQuestion(currentQuestionNum - 1);
    };

    const submit = e => {
        e.preventDefault();

        sendMessage({
            message: answer,
            messageParams: {
                questionIndex: currentQuestionNum,
                choiceIndex: currentQuestion.choices?.indexOf(answer),
            },
        });
        setGeneratingFeedback(true);
        setIsCorrect(undefined);
    };

    return (
        <>
            {currentQuestion ? (
                <CenteredColumn>
                    <h1>{lesson.title}</h1>
                    <h3>Question #{currentQuestionNum + 1}</h3>
                    {typeof currentQuestion === "string" ? (
                        <>
                            <p>{currentQuestion}</p>
                            <Textfield
                                value={writtenQuestionAnswer}
                                onChange={e => setAnswer(e.target.value)}
                            />
                            {incorrectFeedback[currentQuestionNum].map(
                                feedback => (
                                    <p>{feedback}</p>
                                )
                            )}
                            {isCorrect === false && (
                                <p>{currentMessage.slice(10)}</p>
                            )}
                        </>
                    ) : (
                        <>
                            <p>{currentQuestion.question.title}</p>
                            {currentQuestion.question.choices.map(
                                (choice, i) => (
                                    <>
                                        <RadioButton
                                            key={i}
                                            label={choice}
                                            checked={answer === choice}
                                            onChange={e => setAnswer(choice)}
                                        />
                                        {answer === choice &&
                                            isCorrect === false && (
                                                <p>
                                                    {currentMessage.slice(10)}
                                                </p>
                                            )}
                                        {incorrectFeedback[currentQuestionNum][
                                            i
                                        ] && (
                                            <p>
                                                {
                                                    incorrectFeedback[
                                                        currentQuestionNum
                                                    ][i]
                                                }
                                            </p>
                                        )}
                                    </>
                                )
                            )}
                        </>
                    )}
                    {isCorrect === true && <p>{currentMessage.slice(8)}</p>}
                    {correctFeedback[currentQuestionNum] && (
                        <p>{correctFeedback[currentQuestionNum]}</p>
                    )}
                    <CustomButton disabled={!answer} onClick={submit}>
                        Submit
                    </CustomButton>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                        <CustomButton
                            outline
                            disabled={currentQuestionNum === 0}>
                            Previous Question
                        </CustomButton>
                        <CustomButton
                            outline
                            disabled={
                                currentQuestionNum ===
                                lesson.learning_objectives.length * 3 - 1
                            }>
                            Next Question
                        </CustomButton>
                    </div>
                </CenteredColumn>
            ) : (
                <GeneratingQuestionModal
                    questionNum={currentQuestionNum}
                    goToPrevQuestion={goToPrevQuestion}
                />
            )}
        </>
    );
}

export default Quiz;
