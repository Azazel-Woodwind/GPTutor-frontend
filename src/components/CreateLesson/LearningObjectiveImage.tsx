import { FaImage } from "react-icons/fa";
import { MIN_IMAGES } from "../../lib/FormData";
import CenteredRow from "../../styles/containers/CenteredRow";
import { TextWrapper } from "../../styles/TextWrappers";
import IconButton from "../IconButton";
import { CloseIcon, CloseIconContainer } from "./LearningObjective";
import styled from "styled-components";
import CustomButton from "../Button";
import { motion } from "framer-motion";
import React from "react";
import { Controller } from "react-hook-form";
import Textfield from "../Textfield";

export default function LearningObjectiveImage({
    imageIndex,
    learningObjectiveIndex,
    imagesFields,
    form,
}) {
    return (
        <ObjectiveContainer>
            <Controller
                name={`learning_objectives.${learningObjectiveIndex}.images.${imageIndex}.link`}
                control={form.control}
                render={({ field }) => (
                    <Textfield fullwidth label="Link" {...field} />
                )}
            />
            <Controller
                name={`learning_objectives.${learningObjectiveIndex}.images.${imageIndex}.description`}
                control={form.control}
                render={({ field }) => (
                    <Textfield fullwidth label="Description" {...field} />
                )}
            />
            <Delete
                as={motion.p}
                {...(!(imagesFields.fields.length <= MIN_IMAGES) && {
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                })}
                onClick={() => imagesFields.remove(imageIndex)}
                disabled={imagesFields.fields.length <= MIN_IMAGES}>
                Remove
            </Delete>
        </ObjectiveContainer>
    );
}

const Delete = styled.p`
    ${props =>
        props.disabled
            ? "color: grey;"
            : `${props.theme.utils.gradientText};cursor: pointer;font-weight: bold;`}
`;

const ObjectiveContainer = styled.div`
    display: flex;
    gap: 1em;
    /* padding-top: 1em; */
    width: 100%;
    align-items: center;
`;
