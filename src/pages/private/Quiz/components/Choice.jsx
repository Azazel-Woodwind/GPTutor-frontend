import React from "react";
import { useTheme } from "styled-components";
import CollapsableText from "@/components/common/dataDisplay/CollapsableText";
import RadioButton from "@/components/common/input/RadioButton";

/**
 * MultipleChoiceQuestion - A component for displaying a multiple-choice question within a quiz.
 * It renders each choice as an individual component, managing selection and feedback for each choice.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.question - The question object containing details about the multiple-choice question.
 * @param {number} props.questionIndex - The index of the current question in the quiz.
 * @param {Function} props.setSelectedChoiceIndex - Function to set the index of the selected choice.
 * @param {boolean} props.generatingFeedback - Indicates if feedback is being generated for the question.
 * @param {number} props.selectedChoiceIndex - The index of the selected choice.
 * @param {number} props.currentQuestionNum - The number of the current question being displayed.
 * @returns {React.Component} Component for rendering a multiple-choice question with its choices.
 */
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
            !selected &&
            choice.incorrectFeedback
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
                wrap="true"
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
        </div>
    );
}

export default Choice;
