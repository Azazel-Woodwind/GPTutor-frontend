import React from "react";
import { animate } from "framer-motion";

import { ChatContext } from "../context/ChatContext";

import useScreensize from "./useScreensize";

const options = {
    duration: 0.5,
};

const useConversationDisplay = value => {
    const screen = useScreensize();

    let setWidth = screen.width * value;
    const { width, setDraggable } = React.useContext(ChatContext);

    React.useEffect(() => {
        setDraggable(!!value);

        if (value === true) {
            console.log("FULLSCREEN");
            console.log(width.get(), screen.width);

            animate(width, screen.width, options);
            // width.set(screen.width);
        } else if (!value) animate(width, 0, options);
        else {
            console.log(width.get(), screen.width);
            animate(width, setWidth, options);
            // width.set(setWidth);
        }
    }, []);
};

export default useConversationDisplay;
