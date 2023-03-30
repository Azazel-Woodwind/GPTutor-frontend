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

import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type Iprops = {
  value: string[];
  setValue: any;
  options: string[];
};

export default function MultiSelect({ value, setValue, options }: Iprops) {
  const [isOpen, setIsOpen] = useState(false);
 

  const onOptionClick = (opt: string) => {
    if (findItem(opt)) {
      const filteredValues = value.filter(item => item !== opt);
      setValue(filteredValues);
      return;
    }
    setValue([...value, opt]);
  };

  const findItem = (item: string) => {
    if (value.includes(item)) {
      return true;
    }
    return false;
  };

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="relative w-full  ">
      <div className="flex items-center   justify-between border border-white  rounded-[7px] h-[42px] px-2 overflow-scroll">
        <p>{value.length} selected</p>
        <BiChevronDown size={20} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out bg-[#040A1E] rounded-lg border left-0 right-0 mt-2 absolute inse ${
          !isOpen && "hidden"
        }`}
      >
        {options.map(opt => (
          <div
            onClick={() => onOptionClick(opt)}
            className={`border-b last:border-b-0 px-2 py-1.5 hover:bg-white/10 cursor-pointer ${
              findItem(opt) && "bg-white/40"
            }`}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}
