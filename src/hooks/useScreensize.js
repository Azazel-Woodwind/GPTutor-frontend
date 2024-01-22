import React from "react";

/**
 * useScreensize - A custom hook for tracking the size of the browser window.
 * It updates the width and height state on window resize and can optionally
 * execute a callback function with size information.
 *
 * @param {Function} [callback] - An optional callback function that is executed on window resize.
 *                                Receives the old and new width and height as arguments.
 * @returns {Object} An object containing the current width and height of the window.
 */
const useScreensize = callback => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    // Effect to attach and clean up the window resize event listener
    React.useEffect(() => {
        const resize = e => {
            if (callback)
                callback(width, height, window.innerWidth, window.innerHeight);

            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, []);

    return {
        width,
        height,
    };
};

export default useScreensize;
