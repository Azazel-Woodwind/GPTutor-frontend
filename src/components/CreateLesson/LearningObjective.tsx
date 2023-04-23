import {
    MAX_IMAGES,
    MIN_IMAGES,
    MIN_LEARNING_OBJECTIVES,
} from "../../lib/FormData";
import useDynamicFields from "../../hooks/useDynamicFields";
import LearningObjectiveImage from "./LearningObjectiveImage";
import Textfield from "../Textfield";
import CenteredColumn from "../../styles/containers/CenteredColumn";
import { TextWrapper } from "../../styles/TextWrappers";
import CustomButton from "../Button";
import { Cross } from "@styled-icons/entypo/Cross";
import styled from "styled-components";
import IconButton from "../IconButton";
import SvgLinearGradient from "../SvgLinearGradient";
import { nanoid } from "nanoid";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Controller, useFieldArray } from "react-hook-form";
import { ImageFill } from "styled-icons/bootstrap";

export default function LearningObjective({
    index,
    learningObjectivesFields,
    form,
}) {
    const gradientID = useMemo(nanoid, []);

    const imagesFields = useFieldArray({
        control: form.control,
        name: `learning_objectives.${index}.images`,
    });

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
                    <CloseIcon
                        viewBox="0 0 20 20"
                        focusable="false"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <SvgLinearGradient gradientID={gradientID} />
                        </defs>

                        <path
                            fill={
                                !(
                                    learningObjectivesFields.fields.length <=
                                    MIN_LEARNING_OBJECTIVES
                                )
                                    ? `url(#${gradientID})`
                                    : "gray"
                            }
                            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"></path>
                    </CloseIcon>
                </IconButton>
            </CloseIconContainer>
            <ObjectiveTitle size="xl">
                Learning Objective #{index + 1}
            </ObjectiveTitle>
            <Controller
                name={`learning_objectives.${index}.title`}
                control={form.control}
                render={({ field }) => <Textfield label="Title" {...field} />}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                }}>
                {imagesFields.fields.map((image, imageIndex) => (
                    <LearningObjectiveImage
                        form={form}
                        key={image.id}
                        imageIndex={imageIndex}
                        imagesFields={imagesFields}
                        learningObjectiveIndex={index}
                    />
                ))}
            </div>
            <CustomButton
                disabled={imagesFields.fields.length >= MAX_IMAGES}
                onClick={e => {
                    //This is very good code! Well played! Truly exemplary** Just like I expected from you ;)
                    //Keep up the good work
                    e.preventDefault();
                    imagesFields.append({
                        link: "",
                        description: "",
                    });
                }}
                outline
                style={{ width: "fit-content" }}>
                Add Image
            </CustomButton>
        </Container>
    );
}

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
