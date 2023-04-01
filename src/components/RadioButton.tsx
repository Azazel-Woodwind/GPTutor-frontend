import React from "react";
import "./avatar.css";

type RadioProps = {
  name: string;
  id: string;
  value: string;
  setValue: any;
};

export default function RadioButton({ name, id, value, setValue }: RadioProps) {
  return (
    <div className="flex items-center space-x-2">
      <label className="radio-label -ml-[10px]">
        <input
          className="radio-input"
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={() => setValue(id)}
          checked={value === id}
        />
        <span className="custom-radio" />
      </label>
      <label className="text-[20px] font-abel">{id}</label>
    </div>
  );
}
