import { Controller, useFieldArray } from "react-hook-form";
import SVGIcon from "@/components/common/graphics/SVGIcon";
import IconButton from "@/components/common/input/IconButton";
import Textfield from "@/components/common/input/Textfield";
import styled from "styled-components";
import TextWrapper from "@/components/utils/TextWrapper";
import { CrossSvgData } from "@/lib/svgIconData";
import LearningObjectiveInstruction from "./LearningObjectiveInstruction";
import Button from "@/components/common/input/Button";
import { MIN_LEARNING_OBJECTIVES } from "@/lib/formData";

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
                        learningObjectivesFields.remove(index);
                    }}
                    disabled={
                        learningObjectivesFields.fields.length <=
                        MIN_LEARNING_OBJECTIVES
                    }>
                    <SVGIcon
                        size="1.9rem"
                        svgData={CrossSvgData}
                        fill={
                            learningObjectivesFields.fields.length <=
                            MIN_LEARNING_OBJECTIVES
                                ? `grey`
                                : "gradient"
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
