import { z } from "zod";
import { password_schema } from "./userFormSchema";

const ResetPasswordSchema = z
    .object({
        password: password_schema,
        confirm_password: z.string(),
    })
    .superRefine(({ confirm_password, password }, ctx) => {
        try {
            password_schema.parse(password); // Check if the password field is valid
            if (confirm_password !== password) {
                ctx.addIssue({
                    code: "custom",
                    message: "Must match password",
                    path: ["confirm_password"],
                });
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                ctx.addIssue({
                    code: "custom",
                    message: "Password is not valid",
                    path: ["confirm_password"],
                });
            } else {
                throw error;
            }
        }
    });

export default ResetPasswordSchema;
