//If we're going to reuse animations a massive amount define them here

export const fade_animation = ({ delayed = false } = {}) => ({
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
    },
    transition: {
        duration: 0.5,
        delay: delayed ? 0.5 : 0,
    },
});

export const fade_exit = { opacity: 0, transition: { duration: 0.5 } };
