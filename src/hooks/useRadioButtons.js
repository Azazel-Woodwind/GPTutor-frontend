import { nanoid } from "nanoid";
import React from "react";
import RadioButton from "@/components/common/input/RadioButton";

function useRadioButtons(options) {
    const [selected, setSelected] = React.useState(null);

    const ids = React.useMemo(() => options.map(() => nanoid()), []);

    // console.log(selected);

    return {
        selected,
        setSelected,
        RadioButtons: options.map((option, i) => (
            <RadioButton
                key={ids[i]}
                label={option.label}
                checked={selected === option.value}
                onChange={() => setSelected(option.value)}
            />
        )),
    };
}

export default useRadioButtons;
