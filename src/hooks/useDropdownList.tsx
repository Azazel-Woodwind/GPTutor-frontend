import React from "react";
import DropdownList from "../components/DropdownList";

function useDropdownList({ label, options, required, ...props }) {
    const [selected, setSelected] = React.useState<string | null>(null);

    return {
        selected,
        Component: DropdownList,
        props: {
            label,
            options,
            selected,
            setSelected,
            required,
            ...props,
        },
    };
}

export default useDropdownList;
