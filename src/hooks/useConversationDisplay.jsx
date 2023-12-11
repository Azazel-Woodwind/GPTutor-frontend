import React from "react";
import { animate } from "framer-motion";

import { ChatContext } from "@/context/ChatContext";

import useScreensize from "./useScreensize";

const options = {
    duration: 0.5,
};

const useConversationDisplay = value => {
    const screen = useScreensize();

    let setWidth = screen.width * value;
    const { width, setDraggable } = React.useContext(ChatContext);

    // React.useEffect(() => {
    //     console.log("WIDTH CHANGED");
    // }, [width]);

    React.useEffect(() => {
        setDraggable(value === false ? false : true);

        if (value == true) animate(width, screen.width, options);
        else if (!value) animate(width, 0, options);
        else animate(width, setWidth, options);
    }, []);
};

export default useConversationDisplay;
