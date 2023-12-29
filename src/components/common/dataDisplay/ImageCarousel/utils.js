export const variants = {
    slide: {
        enter: direction => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: direction => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
            };
        },
    },
    fade: {
        enter: () => {
            return {
                zIndex: 0,
                opacity: 0,
            };
        },
        center: {
            zIndex: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
        exit: () => {
            return {
                zIndex: 0,
                opacity: 0,
                transition: {
                    duration: 0,
                    delay: 0.5,
                },
            };
        },
    },
};

export const transitions = {
    slide: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
    },
};

export const swipeConfidenceThreshold = 10000;

export const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};
