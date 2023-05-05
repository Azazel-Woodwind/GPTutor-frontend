import * as z from "zod";
import {
    education_level_schema,
    exam_board_schema,
    subject_schema,
} from "./userFormSchema";
import { MAX_LEARNING_OBJECTIVES, MIN_LEARNING_OBJECTIVES } from "./FormData";
import { IMAGE_LINK_REGEX, SVG_REGEX } from "./regexes";

export const lessonFormSchema = ({
    subjectOptions,
    educationLevels,
    examBoards,
}) =>
    z
        .object({
            title: z.string().min(1, { message: "Title is required" }),
            description: z.string(),
            subject: subject_schema(subjectOptions),
            education_level: education_level_schema(educationLevels),
            exam_board: exam_board_schema(examBoards),
            caption: z.string().min(1, { message: "Caption is required" }),
            learning_objectives: z
                .array(
                    z.object({
                        title: z.string().min(1, {
                            message: "Learning objective title is required",
                        }),
                        images: z.array(
                            z.object({
                                link: z
                                    .string()
                                    .min(1, {
                                        message: "Image link is required",
                                    })
                                    .refine(
                                        val =>
                                            IMAGE_LINK_REGEX.test(val) ||
                                            SVG_REGEX.test(val),
                                        {
                                            message:
                                                "Image link must be of type JPG, JPEG, PNG, GIF, WEBP or SVG",
                                        }
                                    ),
                                description: z.string(),
                            })
                        ),
                    })
                )
                .min(MIN_LEARNING_OBJECTIVES, {
                    message: `Must have at least ${MIN_LEARNING_OBJECTIVES} learning objectives`,
                })
                .max(MAX_LEARNING_OBJECTIVES, {
                    message: `Must have at most ${MAX_LEARNING_OBJECTIVES} learning objectives`,
                }),
            is_published: z.boolean().refine(val => val),
        })
        .or(
            z.object({
                title: z.string(),
                description: z.string(),
                subject: z.string(),
                education_level: z.string(),
                exam_board: z.string(),
                caption: z.string(),
                learning_objectives: z.array(
                    z.object({
                        title: z.string(),
                        images: z.array(
                            z.object({
                                link: z.string(),
                                description: z.string(),
                            })
                        ),
                    })
                ),
                is_published: z.boolean().refine(val => !val),
            })
        );
