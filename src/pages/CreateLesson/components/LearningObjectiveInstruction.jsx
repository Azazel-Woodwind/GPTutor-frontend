import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
import { Controller } from "react-hook-form";
import Textfield from "../../../components/input/Textfield";

export default function LearningObjectiveInstruction({
    instructionIndex,
    learningObjectiveIndex,
    instructionFields,
    form,
}) {
    return (
        <ObjectiveContainer>
            <div
                style={{
                    height: "4rem",
                    width: "fit-content",
                    display: "flex",
                    fontSize: "1.15rem",
                }}>
                <div style={{ margin: "auto" }}>
                    <h3>
                        {learningObjectiveIndex + 1}.{instructionIndex + 1}
                    </h3>
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <Controller
                    name={`learning_objectives.${learningObjectiveIndex}.instructions.${instructionIndex}.instruction`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Textfield
                            fullwidth
                            label="Instruction"
                            error={fieldState.invalid}
                            helperText={
                                fieldState.invalid && fieldState.error?.message
                            }
                            multiline
                            rows={3}
                            {...field}
                        />
                    )}
                />
            </div>

            <Controller
                name={`learning_objectives.${learningObjectiveIndex}.instructions.${instructionIndex}.media_link`}
                control={form.control}
                render={({ field, fieldState }) => (
                    <Textfield
                        // fullwidth
                        label="Media link"
                        error={fieldState.invalid}
                        helperText={
                            fieldState.invalid && fieldState.error?.message
                        }
                        {...field}
                    />
                )}
            />
            <Delete
                as={motion.p}
                {...{
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                }}
                onClick={() => {
                    instructionFields.remove(instructionIndex);
                }}>
                Remove
            </Delete>
        </ObjectiveContainer>
    );
}

const Delete = styled.p`
    margin-top: 22px;
    ${props =>
        props.disabled
            ? "color: grey;"
            : `${props.theme.utils.gradientText};cursor: pointer;font-weight: bold;`};
`;

const ObjectiveContainer = styled.div`
    display: flex;
    gap: 1rem;
    /* padding-top: 1rem; */
    width: 100%;
    min-height: 4rem;
    align-items: flex-start;
`;
