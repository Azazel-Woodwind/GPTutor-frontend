import * as z from "zod";
import { education_level_schema, subject_schema } from "./userFormSchema";

const minLearningObjectives = 3;
const maxLearningObjectives = 5;

export const lessonFormSchema = ({ subjectOptions, educationLevels }) =>
    z.object({
        title: z.string().min(1, { message: "Title is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        subject: subject_schema(subjectOptions),
        education_level: education_level_schema(educationLevels),
        caption: z.string().min(1, { message: "Caption is required" }),
        learning_objectives: z
            .array(
                z.object({
                    title: z.string().min(1, {
                        message: "Learning objective title is required",
                    }),
                    images: z.array(
                        z.object({
                            link: z.string().min(1, {
                                message: "Image link is required",
                            }),
                            description: z.string().min(1, {
                                message: "Image description is required",
                            }),
                        })
                    ),
                })
            )
            .min(minLearningObjectives, {
                message: `Must have at least ${minLearningObjectives} learning objectives`,
            })
            .max(maxLearningObjectives, {
                message: `Must have at most ${maxLearningObjectives} learning objectives`,
            }),
        is_published: z.boolean(),
    });
