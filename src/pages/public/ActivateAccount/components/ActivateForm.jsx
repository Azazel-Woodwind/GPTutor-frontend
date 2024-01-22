import { useForm } from "react-hook-form";
import { useNotification } from "@/context/NotificationContext";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import UserAPI from "@/api/UserAPI";
import supabase from "@/api/configs/supabase";
import PasswordSection from "@/components/application/PasswordSection";
import XForm from "@/components/application/XForm";
import ResetPasswordSchema from "@/lib/schemas/resetPasswordSchema";

function ActivateForm() {
    const { sendNotification } = useNotification();

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    });

    const activate = async data => {
        console.log(data);

        if (!form.formState.isValid) {
            sendNotification({
                label: "Please fill in all fields",
                duration: 5,
                type: "error",
            });
            throw new Error("Form is not valid");
        }

        try {
            await UserAPI.activateMe(data.password);
            sendNotification({
                label: "Account successfully activated!",
                duration: 5,
                type: "success",
            });
            await supabase.auth.refreshSession();
        } catch (error) {
            console.log(error);
            sendNotification({
                label: "Error activating account",
                duration: 5,
                type: "error",
            });
        }
    };

    return (
        <XForm
            onSubmit={form.handleSubmit(activate)}
            // submitButtonText={
            //     "WARNING: Do NOT let your wife CATCH you using THIS application"
            // }
            submitButtonText={"Activate"}
            title={"Activate your account"}
            isValid={!form.formState.isValid || form.formState.isSubmitting}>
            <PasswordSection form={form} />
        </XForm>
    );
}

export default ActivateForm;
