import { Controller, useFieldArray } from "react-hook-form";
import SvgIcon from "../../../components/SvgIcon";
import IconButton from "../../../components/input/IconButton";
import { MIN_LEARNING_OBJECTIVES } from "../../../lib/FormData";
import Textfield from "../../../components/input/Textfield";
import styled from "styled-components";
import { TextWrapper } from "../../../styles/TextWrappers";
import { CrossSvgData } from "../../../lib/svgIconData";
import LearningObjectiveInstruction from "./LearningObjectiveInstruction";
import Button from "../../../components/input/Button";

export default function LearningObjective({
    index,
    learningObjectivesFields,
    form,
}) {
    const instructionFields = useFieldArray({
        control: form.control,
        name: `learning_objectives.${index}.instructions`,
    });

    return (
        <Container>
            <CloseIconContainer>
                <IconButton
                    onClick={() => {
                        // if (
                        //     !(
                        //         learningObjectivesFields.fields.length <=
                        //         MIN_LEARNING_OBJECTIVES
                        //     )
                        // )
                        learningObjectivesFields.remove(index);
                    }}
                    // disabled={
                    //     learningObjectivesFields.fields.length <=
                    //     MIN_LEARNING_OBJECTIVES
                    // }
                >
                    <SvgIcon
                        size="1.9rem"
                        svgData={CrossSvgData}
                        fill={
                            !(
                                learningObjectivesFields.fields.length <=
                                MIN_LEARNING_OBJECTIVES
                            )
                                ? `gradient`
                                : "gradient"
                            // "gray"
                        }
                    />
                </IconButton>
            </CloseIconContainer>
            <ObjectiveTitle size="xl">
                Learning Objective #{index + 1}
            </ObjectiveTitle>
            <Controller
                name={`learning_objectives.${index}.description`}
                control={form.control}
                render={({ field, fieldState, formState }) => (
                    <Textfield
                        label={`Description #${index + 1}`}
                        {...field}
                        error={fieldState.invalid}
                        helperText={
                            fieldState.invalid && fieldState.error?.message
                        }
                        multiline
                        rows={3}
                    />
                )}
            />
            {instructionFields.fields.map((objective, instructionIndex) => (
                <LearningObjectiveInstruction
                    form={form}
                    key={objective.id}
                    instructionIndex={instructionIndex}
                    instructionFields={instructionFields}
                    learningObjectiveIndex={index}
                />
            ))}
            <Button
                onClick={e => {
                    e.preventDefault();
                    instructionFields.append({
                        instruction: "",
                        media_link: "",
                    });
                }}
                outline>
                Add Instruction
            </Button>
        </Container>
    );
}

export const CloseIcon = styled.svg`
    width: 1.9rem;
    height: 1.9rem;
`;

export const CloseIconContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`;

const ObjectiveTitle = styled(TextWrapper)`
    text-align: left;
    width: 100%;
    font-weight: 600;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 1rem;
    padding: 1rem 0;
`;
