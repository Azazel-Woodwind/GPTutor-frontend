import React from "react";
import CenteredColumn from "../../../styles/containers/CenteredColumn";
import CenteredRow from "../../../styles/containers/CenteredRow";
import QuizQuestion from "../../../components/Quiz/QuizQuestion";
import FinishQuizButton from "./FinishQuizButton";

function Question({
    i,
    questions,
    currentQuestionNum,
    generatingFeedback,
    ...props
}) {
    // const  = props;

    const [selectedChoiceIndex, setSelectedChoiceIndex] =
        React.useState(undefined);
    const [answer, setAnswer] = React.useState("");

    const imageRef = React.useRef(null);

    React.useEffect(() => {
        console.log("QUESTION HTML:", questions[i]);
        if (!questions[i]?.imageHTML || imageRef.current.shadowRoot) return;

        const shadowRoot = imageRef.current.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = questions[i]?.imageHTML;
    }, [questions[i]?.imageHTML]);

    const callback = React.useCallback(
        node => {
            if (node !== null) {
                node.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        },
        [currentQuestionNum]
    );

    // console.log(questions[i]);

    return (
        <CenteredColumn
            width="100vw"
            style={{
                minHeight: "100vh",
                padding: "1.25em 0",
                // minHeight?
            }}
            ref={callback}
            key={i}>
            <CenteredRow
                wrap
                fillparent
                gap="1.3em"
                style={
                    {
                        // padding: "1.25em",
                        // paddingLeft: "2em",
                    }
                }>
                <QuizQuestion
                    {...{
                        i,
                        questions,
                        currentQuestionNum,
                        generatingFeedback,
                        ...props,
                    }}
                    answer={answer}
                    setAnswer={setAnswer}
                    selectedChoiceIndex={selectedChoiceIndex}
                    setSelectedChoiceIndex={setSelectedChoiceIndex}
                    finalQuestionButton={
                        <FinishQuizButton
                            generatingFeedback={generatingFeedback}
                            onClick={() => {
                                setExit(true);
                            }}
                        />
                    }
                />
                {!questions[i]?.imageHTML ? (
                    <div
                        style={{
                            height: "350px",
                            width: "550px",
                            backgroundColor: "white",
                            color: "black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <h2>Generating image...</h2>
                    </div>
                ) : (
                    <div
                        style={{ backgroundColor: "white", color: "black" }}
                        ref={imageRef}
                    />
                )}
            </CenteredRow>
        </CenteredColumn>
    );
}

export default Question;
