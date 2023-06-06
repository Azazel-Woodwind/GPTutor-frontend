import React from "react";

const useScreensize = callback => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    React.useEffect(() => {
        const resize = e => {
            if (callback)
                callback(width, height, window.innerWidth, window.innerHeight);
            // console.log("new size", window.innerWidth, window.innerHeight);
            // console.log(e);

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
