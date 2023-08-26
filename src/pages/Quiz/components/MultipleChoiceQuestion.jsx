import React from "react";
import Choice from "./Choice";

function MultipleChoiceQuestion({
    question,
    questionIndex,
    setSelectedChoiceIndex,
    generatingFeedback,
    selectedChoiceIndex,
    currentQuestionNum,
}) {
    // const [correctChoiceIndex, setCorrectChoiceIndex] = React.useState(undefined);

    // React.useEffect(() => {
    //     if (question.correctFeedback) {
    //         setCorrectChoiceIndex(selectedChoiceIndex);
    //     }
    // }, [question?.correctFeedback])

    return (
        <>
            <h2>{question.title}</h2>
            <div
                style={{
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.94em",
                    marginTop: "0.5em",
                }}>
                {question.choices.map((choice, choiceIndex) => (
                    <Choice
                        key={`${questionIndex}-${choiceIndex}`}
                        questionIndex={questionIndex}
                        selectedChoiceIndex={selectedChoiceIndex}
                        setSelectedChoiceIndex={setSelectedChoiceIndex}
                        generatingFeedback={generatingFeedback}
                        choice={choice}
                        choiceIndex={choiceIndex}
                        question={question}
                        currentQuestionNum={currentQuestionNum}
                        // correctChoiceIndex={correctChoiceIndex}
                    />
                ))}
            </div>
        </>
    );
}

export default MultipleChoiceQuestion;
