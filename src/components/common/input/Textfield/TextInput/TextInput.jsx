import React from "react";
import IconButton from "@/components/common/input/IconButton/IconButton";
import { EyeOutline } from "@styled-icons/evaicons-outline/EyeOutline";
import { EyeOffOutline } from "@styled-icons/evaicons-outline/EyeOffOutline";
import { EndAdornmentWrapper, TextInputStyle } from "./styles";

function TextInput({ type, multiline, ...props }, ref) {
    const [wrapper, setRef] = React.useState(undefined);
    const [visible, setVisible] = React.useState(false);
    const [endAdornmentWidth, setEndAdornmentWidth] = React.useState(0);

    React.useEffect(() => {
        setEndAdornmentWidth(wrapper?.getBoundingClientRect().width);
    });

    const callback = React.useCallback(node => {
        if (node !== null) {
            setRef(node);
        }
    }, []);

    return (
        <>
            <TextInputStyle
                {...props}
                autocomplete="off"
                type={visible ? "text" : type}
                ref={ref}
                adornmentWidth={endAdornmentWidth}
                {...(multiline && {
                    as: "textarea",
                    ...(props.rows && { rows: props.rows }),
                })}
                // style={{ marginTop: "5px" }}
            />

            {type === "password" ? (
                <EndAdornmentWrapper>
                    <span style={{ paddingRight: "0.7em" }} ref={callback}>
                        <IconButton
                            onKeyUp={e => {
                                if (e.key === "Enter") {
                                    setVisible(!visible);
                                }
                            }}
                            onClick={e => {
                                setVisible(!visible);
                            }}>
                            {visible ? (
                                <EyeOutline size={27} />
                            ) : (
                                <EyeOffOutline size={27} />
                            )}
                        </IconButton>
                    </span>
                </EndAdornmentWrapper>
            ) : (
                props.endAdornment && (
                    <EndAdornmentWrapper>
                        <span ref={callback}>{props.endAdornment}</span>
                    </EndAdornmentWrapper>
                )
            )}
        </>
    );
}

export default React.forwardRef(TextInput);
