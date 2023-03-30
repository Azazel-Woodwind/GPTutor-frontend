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
  value: string;
  setValue: any;
  options: string[];
};

export default function DropDownList({ value, setValue, options }: Iprops) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelect] = useState("");
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="relative w-full flex-1">
      <div className="flex items-center justify-between border border-white w-full rounded-[7px] h-[42px] px-2">
        <p>{value}</p>
        <BiChevronDown size={20} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out bg-[#040A1E] rounded-lg border left-0 right-0 mt-2 absolute z-20 ${
          !isOpen && "hidden"
        }`}
      >
        {options.map(opt => (
          <div
            onClick={() => setValue(opt)}
            className="border-b last:border-0 px-2 py-1.5 hover:bg-white/20 cursor-pointer "
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}
