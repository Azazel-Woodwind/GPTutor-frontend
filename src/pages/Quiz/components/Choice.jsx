import React from "react";
import { useTheme } from "styled-components";
import RadioButton from "../../../components/input/RadioButton";
import CollapsableText from "../../../components/CollapsableText";

function Choice({
    questionIndex,
    answer,
    setAnswer,
    setSelectedChoiceIndex,
    correctFeedback,
    currentFeedback,
    incorrectFeedback,
    generatingFeedback,
    choice,
    choiceIndex,
}) {
    const [collapsed, setCollapsed] = React.useState(false);

    const theme = useTheme();

    const selected = answer === choice;
    const hasCurrentFeedback =
        currentFeedback?.choiceIndex === choiceIndex &&
        currentFeedback?.questionIndex === questionIndex;
    const isCorrect = correctFeedback?.choiceIndex === choiceIndex;

    React.useEffect(() => {
        if (
            incorrectFeedback &&
            currentFeedback?.questionIndex === questionIndex &&
            currentFeedback?.choiceIndex !== choiceIndex &&
            currentFeedback?.text?.length === 1
        ) {
            setCollapsed(true);
        }
    }, [currentFeedback]);

    return (
        <div
            style={{
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
            }}>
            <RadioButton
                wrap
                key={`${questionIndex}-${choiceIndex}`}
                label={choice}
                checked={
                    selected ||
                    hasCurrentFeedback ||
                    incorrectFeedback ||
                    isCorrect
                }
                onChange={e => {
                    setAnswer(choice);
                    setSelectedChoiceIndex(choiceIndex);
                }}
                disabled={
                    (hasCurrentFeedback && !currentFeedback?.isCorrect) ||
                    incorrectFeedback ||
                    (generatingFeedback && !selected) ||
                    (correctFeedback && !isCorrect)
                }
                fontSize="1.5rem"
                radioButtonSize="1.5rem"
                borderWidth="0.65rem"
            />
            {incorrectFeedback && (
                <CollapsableText
                    style={{
                        color: theme.colours.error,
                    }}
                    {...{
                        collapsed,
                        setCollapsed,
                    }}>
                    {incorrectFeedback}
                </CollapsableText>
            )}
            {currentFeedback?.questionIndex === questionIndex &&
                currentFeedback?.isCorrect === false &&
                currentFeedback?.choiceIndex === choiceIndex && (
                    <CollapsableText
                        style={{
                            color: theme.colours.error,
                        }}
                        collapsable={false}>
                        {currentFeedback.text}
                    </CollapsableText>
                )}
        </div>
    );
}

export default Choice;
