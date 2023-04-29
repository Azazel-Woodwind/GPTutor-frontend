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
import SvgIcon from "../SvgIcon";
import { CrossSvgData } from "../../lib/svgIconData";

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
