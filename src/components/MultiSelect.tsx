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
  const onDelete = (item: string) => {
    const filterValues = value.filter(opt => opt !== item);
    setValue(filterValues);
  };
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="relative w-full  ">
      <div className="flex items-center   justify-between border border-white  rounded-[7px] h-[42px] px-2 overflow-scroll">
        <div className="flex  flex-1 overflow-scroll max-w-[180px] items-center space-x-3 ">
          {value.map(item => (
            <div
              onClick={() => onDelete(item)}
              className="bg-white/10 flex space-x-3 px-2 py-[2px] rounded-md items-center"
            >
              <p>{item}</p>
              <button>x</button>
            </div>
          ))}
        </div>
        <BiChevronDown size={20} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out bg-[#040A1E] rounded-lg border left-0 right-0 mt-2 absolute inse ${
          !isOpen && "hidden"
        }`}
      >
        {options.map(opt => (
          <div
            onClick={() => setValue([...value, opt])}
            className="border-b px-2 py-1.5 hover:bg-white/20 cursor-pointer "
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}
