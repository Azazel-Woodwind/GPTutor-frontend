import * as z from "zod";
import {
    CONTAINS_LOWERCASE_REGEX,
    CONTAINS_NUMBER_REGEX,
    CONTAINS_SPECIAL_CHARACTER_REGEX,
    CONTAINS_UPPERCASE_REGEX,
    EMAIL_REGEX,
    NAME_REGEX,
    PASSWORD_LENGTH_REGEX,
} from "./regexes";

export const first_name_schema = z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" })
    .regex(NAME_REGEX, {
        message: "Must only contain letters",
    })
    .min(2, {
        message: "Must be at least 2 characters long",
    });

export const last_name_schema = z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .regex(NAME_REGEX, {
        message: "Must only contain letters",
    })
    .min(2, {
        message: "Must be at least 2 characters long",
    });

export const email_schema = z
    .string()
    .email({ message: "Enter a valid email" });

export const education_level_schema = educationLevels =>
    z
        .string()
        .refine(
            val =>
                educationLevels
                    .map(level => level.toLowerCase())
                    .includes(val.toLowerCase()),
            {
                message: `Education level must be one of ${educationLevels.join(
                    ", "
                )}`,
            }
        );

export const occupation_schema = occupations =>
    z
        .string()
        .refine(
            val =>
                occupations
                    .map(occupation => occupation.toLowerCase())
                    .includes(val.toLowerCase()),
            {
                message: `Occupation must be one of ${occupations.join(", ")}`,
            }
        );

export const subject_schema = subjectOptions =>
    z
        .string()
        .refine(
            val =>
                subjectOptions
                    .map(subject => subject.toLowerCase())
                    .includes(val.toLowerCase()),
            {
                message: `Subjects must each be one of ${subjectOptions.join(
                    ", "
                )}`,
            }
        );

export const subjects_schema = subjectOptions =>
    z.array(subject_schema(subjectOptions)).nonempty({
        message: "Must select at least one subject",
    });

export const password_schema = z
    .string()
    .regex(PASSWORD_LENGTH_REGEX, {
        message: "Password must be between 8 and 24 characters",
    })
    .regex(CONTAINS_UPPERCASE_REGEX, {
        message: "Password must contain at least one uppercase letter",
    })
    .regex(CONTAINS_LOWERCASE_REGEX, {
        message: "Password must contain at least one lowercase letter",
    })
    .regex(CONTAINS_NUMBER_REGEX, {
        message: "Password must contain at least one number",
    })
    .regex(CONTAINS_SPECIAL_CHARACTER_REGEX, {
        message: "Password must contain at least one special character",
    });
