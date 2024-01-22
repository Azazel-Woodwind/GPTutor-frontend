import React from "react";
import { animate } from "framer-motion";
import { ChatContext } from "@/context/ChatContext";
import useScreensize from "./useScreensize";

const options = {
    duration: 0.5,
};

/**
 * A custom hook to manage the X sidebar resizeable animation.
 *
 * @param {boolean} value - The value to animate to.
 * @returns {void} Nothing.
 *
 * @see ChatContext for context related to chat UI.
 * @see useScreensize for screen size management.
 */
function useConversationDisplay(value) {
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
}

export default useConversationDisplay;
