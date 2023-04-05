import React from "react";
import RadioButton from "../components/RadioButton";

function useRadioButtons(options) {
    const [selected, setSelected] = React.useState(null);

    return {
        selected,
        setSelected,
        RadioButtons: options.map(option => (
            <RadioButton
                label={option.label}
                checked={selected === option.value}
                onClick={() => setSelected(option.value)}
            />
        )),
    };
}

export default useRadioButtons;
