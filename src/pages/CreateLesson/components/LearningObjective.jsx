import { Controller } from "react-hook-form";
import SvgIcon from "../../../components/SvgIcon";
import IconButton from "../../../components/input/IconButton";
import { MIN_LEARNING_OBJECTIVES } from "../../../lib/FormData";
import Textfield from "../../../components/input/Textfield";
import styled from "styled-components";
import { TextWrapper } from "../../../styles/TextWrappers";
import { CrossSvgData } from "../../../lib/svgIconData";

export default function LearningObjective({
    index,
    learningObjectivesFields,
    form,
}) {
    return (
        <Container>
            <CloseIconContainer>
                <IconButton
                    onClick={() => {
                        if (
                            !(
                                learningObjectivesFields.fields.length <=
                                MIN_LEARNING_OBJECTIVES
                            )
                        )
                            learningObjectivesFields.remove(index);
                    }}
                    disabled={
                        learningObjectivesFields.fields.length <=
                        MIN_LEARNING_OBJECTIVES
                    }>
                    <SvgIcon
                        size="1.9em"
                        svgData={CrossSvgData}
                        fill={
                            !(
                                learningObjectivesFields.fields.length <=
                                MIN_LEARNING_OBJECTIVES
                            )
                                ? `gradient`
                                : "gray"
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
            <ObjectiveContainer>
                <Controller
                    name={`learning_objectives.${index}.image_link`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Textfield
                            fullwidth
                            label="Image Link"
                            error={fieldState.invalid}
                            helperText={
                                fieldState.invalid && fieldState.error?.message
                            }
                            {...field}
                        />
                    )}
                />
                <Controller
                    name={`learning_objectives.${index}.image_description`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Textfield
                            fullwidth
                            placeholder="An image of..."
                            label="Image Description"
                            error={fieldState.invalid}
                            helperText={
                                fieldState.invalid && fieldState.error?.message
                            }
                            {...field}
                        />
                    )}
                />
            </ObjectiveContainer>
        </Container>
    );
}

const ObjectiveContainer = styled.div`
    display: flex;
    gap: 1em;
    /* padding-top: 1em; */
    width: 100%;
    min-height: 64px;
    align-items: flex-start;
`;

export const CloseIcon = styled.svg`
    width: 1.9em;
    height: 1.9em;
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
    gap: 1em;
    padding: 1em 0;
`;
