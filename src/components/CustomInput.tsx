import React from "react";

type InputProps = {
  value: string;
  setValue: any;
  title: string;
  lines?: number;
};

export default function CustomInput({
  value,
  setValue,
  title,
  lines = 1,
}: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-[16px] mb-[2px]">{title}</label>
      <textarea
        rows={lines}
        style={{ resize: "none" }}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="border-[#50576E]  border rounded-lg bg-transparent px-3 py-1.5 text-[16px] outline-none"
      />
    </div>
  );
}
