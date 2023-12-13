import { useState } from "react";
import CustomSelect from "../components/CustomSelect";

function useCustomSelect({ ...props }) {
    const [selected, setSelected] = useState([]);

    return [
        selected,
        <CustomSelect
            {...props}
            selected={selected}
            setSelected={setSelected}
        />,
    ];
}

export default useCustomSelect;
