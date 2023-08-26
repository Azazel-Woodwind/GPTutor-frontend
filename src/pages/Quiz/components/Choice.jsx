import React from "react";
import { useTheme } from "styled-components";
import RadioButton from "../../../components/input/RadioButton";
import CollapsableText from "../../../components/CollapsableText";

function Choice({
    questionIndex,
    selectedChoiceIndex,
    setSelectedChoiceIndex,
    generatingFeedback,
    currentQuestionNum,
    choice,
    choiceIndex,
    question,
}) {
    const [collapsed, setCollapsed] = React.useState(false);

    const theme = useTheme();

    const selected = selectedChoiceIndex === choiceIndex;

    React.useEffect(() => {
        if (
            generatingFeedback &&
            currentQuestionNum === questionIndex &&
            !selected
        ) {
            setCollapsed(true);
        }
    }, [generatingFeedback, currentQuestionNum]);

    return (
        <div
            style={{
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.25em",
            }}>
            <RadioButton
                wrap
                label={choice.text}
                checked={selected || choice.incorrectFeedback}
                onChange={e => {
                    setSelectedChoiceIndex(choiceIndex);
                }}
                disabled={
                    choice.incorrectFeedback ||
                    ((question.correctFeedback || generatingFeedback) &&
                        !selected)
                }
                fontSize="1.35em"
                // radioButtonSize="1.5em"
                borderWidth="0.65em"
            />
            {choice.incorrectFeedback && (
                <CollapsableText
                    style={{
                        color: theme.colours.error,
                    }}
                    {...{
                        collapsed,
                        setCollapsed,
                    }}>
                    {choice.incorrectFeedback}
                </CollapsableText>
            )}
            {/* {currentFeedback?.questionIndex === questionIndex &&
                currentFeedback?.isCorrect === false &&
                currentFeedback?.choiceIndex === choiceIndex && (
                    <CollapsableText
                        style={{
                            color: theme.colours.error,
                        }}
                        collapsable={false}>
                        {currentFeedback.text}
                    </CollapsableText>
                )} */}
        </div>
    );
}

export default Choice;
