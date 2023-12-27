import * as z from "zod";
import {
    education_level_schema,
    exam_board_schema,
    subject_schema,
} from "./userFormSchema";
import { MAX_LEARNING_OBJECTIVES, MIN_LEARNING_OBJECTIVES } from "../formData";
import { IMAGE_LINK_REGEX, SVG_REGEX } from "../regexes";

export const lessonSchema = ({ subjectOptions, educationLevels, examBoards }) =>
    z.object({
        title: z.string().min(1, { message: "Title is required" }),
        subject: subject_schema(subjectOptions),
        education_level: education_level_schema(educationLevels),
        exam_boards: z.array(exam_board_schema(examBoards)).min(1, {
            message: "Must have at least 1 exam board",
        }),
        caption: z.string().min(1, { message: "Caption is required" }),
        learning_objectives: z
            .array(
                z.object({
                    description: z.string(),
                    image_link: z
                        .string()
                        .refine(
                            val =>
                                IMAGE_LINK_REGEX.test(val) ||
                                SVG_REGEX.test(val),
                            {
                                message:
                                    "Image link must be of type JPG, JPEG, PNG, GIF, WEBP or SVG",
                            }
                        ),
                    image_description: z.string(),
                })
            )
            .min(MIN_LEARNING_OBJECTIVES, {
                message: `Must have at least ${MIN_LEARNING_OBJECTIVES} learning objectives`,
            })
            .max(MAX_LEARNING_OBJECTIVES, {
                message: `Must have at most ${MAX_LEARNING_OBJECTIVES} learning objectives`,
            }),
    });

export const lessonFormSchema = ({
    subjectOptions,
    educationLevels,
    examBoards,
}) =>
    z
        .object({
            title: z.string().min(1, { message: "Title is required" }),
            subject: subject_schema(subjectOptions),
            education_level: education_level_schema(educationLevels),
            exam_boards: z.array(exam_board_schema(examBoards)).min(1, {
                message: "Must have at least 1 exam board",
            }),
            caption: z.string().min(1, { message: "Caption is required" }),
            learning_objectives: z
                .array(
                    z.object({
                        description: z.string(),
                        instructions: z.array(
                            z.object({
                                instruction: z.string(),
                                media_link: z
                                    .string()
                                    .refine(
                                        val =>
                                            IMAGE_LINK_REGEX.test(val) ||
                                            SVG_REGEX.test(val),
                                        {
                                            message:
                                                "Image link must be of type JPG, JPEG, PNG, GIF, WEBP or SVG",
                                        }
                                    ),
                            })
                        ),
                    })
                )
                .min(1, {
                    message: `Must have at least 1 learning objective`,
                }),
            is_published: z.boolean().refine(val => val),
        })
        .or(
            z.object({
                title: z.string(),
                subject: z.string(),
                education_level: z.string(),
                exam_boards: z.array(z.string()),
                caption: z.string(),
                learning_objectives: z.array(
                    z.object({
                        description: z.string(),
                        instructions: z.array(
                            z.object({
                                instruction: z.string(),
                                media_link: z.string(),
                            })
                        ),
                    })
                ),
                is_published: z.boolean().refine(val => !val),
            })
        );
