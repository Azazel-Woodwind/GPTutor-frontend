import React from "react";
import { Controller } from "react-hook-form";
import Textfield from "./input/Textfield";

function PasswordSection({ form }) {
    const { trigger } = form;

    return (
        <>
            <Controller
                name="password"
                control={form.control}
                render={({
                    field, // { onChange, onBlur, value, name, ref }
                    fieldState, //{ invalid, isTouched, isDirty, error }
                    formState,
                }) => (
                    <Textfield
                        fullwidth
                        label="Password"
                        type="password"
                        required
                        error={fieldState.invalid}
                        {...field}
                        onChange={async e => {
                            field.onChange(e);
                            trigger("confirm_password");
                        }}
                    />
                )}
            />
            <Controller
                name="confirm_password"
                control={form.control}
                render={({
                    field, // { onChange, onBlur, value, name, ref }
                    fieldState, //{ invalid, isTouched, isDirty, error }
                    formState,
                }) => (
                    <Textfield
                        fullwidth
                        label="Confirm Password"
                        type="password"
                        required
                        error={
                            (fieldState.isTouched || fieldState.isDirty) &&
                            fieldState.invalid
                        }
                        helperText={fieldState.error?.message}
                        {...field}
                    />
                )}
            />
        </>
    );
}

function formPropsAreEqual(prevProps, nextProps) {
    return (
        prevProps.form.control === nextProps.form.control &&
        prevProps.form.formState === nextProps.form.formState
    );
}

export default React.memo(PasswordSection, formPropsAreEqual);
