// import React from "react";
// import Select from "react-select";

// const options = [
// { value: "chocolate", label: "Chocolate" },
// { value: "strawberry", label: "Strawberry" },
// { value: "vanilla", label: "Vanilla" },
// ];

// export default function DropDownList() {
//   return (
//     <div className="flex-1">
//       <Select
//         styles={{
//           control: (baseStyles, state) => ({
//             ...baseStyles,
//             borderColor: "white",
//             borderRadius: "8px",
//             backgroundColor: "#040A1E",
//           }),
//           option: (provided, state) => {
//             return { ...provided, backgroundColor: "#040A1E" };
//           },
//         }}
//         components={{
//           IndicatorSeparator: () => null,
//           Placeholder: () => null,
//         }}
//         options={options}
//       />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type Iprops = {
    value: string[];
    setValue: any;
    options: string[];
};

export default function MultiSelect({ value, setValue, options }: Iprops) {
    // console.log(value);

    const [isOpen, setIsOpen] = useState(false);
    // const [toggle, setToggle] = useState(false);

    // document.addEventListener("click", () => {
    //     console.log(toggle);
    //     setIsOpen(toggle);
    // });

    // useEffect(() => {
    //     return () => {
    //         document.removeEventListener("click", () => {
    //             console.log(toggle);
    //             setIsOpen(false);
    //         });
    //     };
    // }, []);

    const onOptionClick = (opt: string) => {
        if (value.includes(opt.toLowerCase())) {
            const filteredValues = value.filter(
                item => item !== opt.toLowerCase()
            );
            setValue(filteredValues);
            return;
        }
        setValue([...value, opt.toLowerCase()]);
    };

    // useEffect(() => {
    //     console.log(toggle);
    // }, [toggle]);

    return (
        <div
            onBlur={() => {
                setIsOpen(false);
            }}
            tabIndex={0}
            className="relative w-full  ">
            <div
                onClick={() => {
                    setIsOpen(!isOpen);
                    // console.log("clicked");
                }}
                className="flex items-center justify-between border border-white  rounded-[7px] h-[42px] px-2 overflow-scroll">
                <p>{value.length} selected</p>
                <BiChevronDown size={20} />
            </div>
            <div
                className={`transition-all duration-300 ease-in-out bg-[#040A1E] rounded-lg border left-0 right-0 mt-2 absolute inse ${
                    !isOpen && "hidden"
                }`}>
                {options.map((opt, i) => (
                    <div
                        key={i}
                        onClick={() => onOptionClick(opt)}
                        className={`border-b last:border-b-0 px-2 py-1.5 hover:bg-white/10 cursor-pointer ${
                            value.includes(opt.toLowerCase()) && "bg-white/40"
                        }`}>
                        {opt}
                    </div>
                ))}
            </div>
        </div>
    );
}
