import React from "react";
import { SessionContext, useAuth } from "../context/SessionContext";

type MessageProps = {
    type: boolean;
    message: string;
    notification: boolean;
};

export default function Messages({
    type,
    message,
    notification,
}: MessageProps) {
    const { session } = useAuth();

    var letter = type
        ? "X"
        : session?.user.user_metadata.first_name[0].toUpperCase();

    if (notification) letter = "S";

    return (
        <div
            className={`flex  space-x-3 p-3  rounded-[7px]  ${
                type && "bg-white/10"
            } `}>
            <span
                className={`rounded-[7px] font-abel ${
                    type
                        ? "bg-gradient-to-r from-cyan-300 to-blue-600 w-[32px] h-[32px] rounded-[12px] flex items-center justify-center text-white "
                        : "bg-white w-[32px] h-[32px] rounded-[12px] flex items-center justify-center"
                }`}>
                {notification ? (
                    <svg
                        className="fill-current h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                ) : (
                    letter
                )}
            </span>
            {notification ? (
                <p className="text-white font-abel italic whitespace-pre-line">
                    {" "}
                    {message}{" "}
                </p>
            ) : (
                <p className="text-[16px] text-white font-abel md:pt-1.5 flex-1">
                    {message}
                </p>
            )}
        </div>
    );
}
