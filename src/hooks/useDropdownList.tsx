import React from "react";
import DropdownList from "../components/DropdownList";

function useDropdownList({ label, options, required, ...props }) {
    const [selected, setSelected] = React.useState<string | null>(null);

    return {
        selected,
        setSelected,
        Dropdown: (
            <DropdownList
                label={label}
                options={options}
                selected={selected}
                setSelected={setSelected}
                required={required}
                {...props}
            />
        ),
    };
}

export default useDropdownList;
