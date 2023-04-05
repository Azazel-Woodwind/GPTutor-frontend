import React from "react";
import { FaImage } from "react-icons/fa";

type InputProps = {
    value: string;
    setValue: any;
    title: string;
    lines?: number;
};

export default function ImageTextArea({
    value,
    setValue,
    title,
    lines = 1,
}: InputProps) {
    return (
        <div className="flex flex-col">
            <label className="text-[16px] mb-[2px]">{title}</label>

            <div className="flex border-[rgb(80,87,110)] border rounded-lg w-full px-1 py-1">
                <div className="border border-[#50576E] p-2 rounded-lg flex items-center m-auto rounded-lg cursor-pointer">
                    <FaImage color="#fff" size={28} />
                </div>
                <textarea
                    rows={1}
                    style={{ resize: "none" }}
                    className="flex-1 rounded-lg bg-transparent px-3 py-2 text-[16px] outline-none"
                />
            </div>
            {/* <div className="text-white border-[#50576E] h-full px-3 ">
          <GrImage color="#fff" size={22} />
        </div>

        <textarea
          rows={lines}
          style={{ resize: "none" }}
          value={value}
          onChange={e => setValue(e.target.value)}
          className="border-[#50576E] border rounded-lg bg-transparent px-3 py-2 text-[16px] outline-none"
        /> */}
        </div>
    );
}
