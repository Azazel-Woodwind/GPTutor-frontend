import React from "react";
import QuizQuestion from "@/components/application/Quiz/QuizQuestion";
import Button from "@/components/common/input/Button/Button";

function Question({ finishLearningObjectiveQuestions, ...props }) {
    const [selectedChoiceIndex, setSelectedChoiceIndex] =
        React.useState(undefined);
    const [answer, setAnswer] = React.useState("");

    return (
        <QuizQuestion
            {...props}
            answer={answer}
            setAnswer={setAnswer}
            selectedChoiceIndex={selectedChoiceIndex}
            setSelectedChoiceIndex={setSelectedChoiceIndex}
            finalQuestionButton={
                <Button
                    style={{ margin: "auto", fontSize: "1.2em" }}
                    onClick={finishLearningObjectiveQuestions}>
                    Continue Lesson
                </Button>
            }
        />
    );
}

export default Question;
