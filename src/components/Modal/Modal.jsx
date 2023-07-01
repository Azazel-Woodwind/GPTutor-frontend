import { useEffect } from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import styled from "styled-components";

const variants = {
    fade: {
        hidden: {
            opacity: 0,
            scale: 0,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.2,
                ease: "easeIn",
            },
        },
        exit: {
            opacity: 0,
            scale: 0,
            transition: {
                duration: 0.15,
                ease: "easeOut",
            },
        },
    },
    badSuspension: {
        hidden: {
            y: "-100vh",
            opacity: 0,
            transform: "scale(0) rotateX(-360deg)",
        },
        visible: {
            y: "-25vh",
            opacity: 1,
            transition: {
                duration: 0.2,
                type: "spring",
                damping: 15,
                stiffness: 500,
            },
        },
        exit: {
            y: "-100vh",
            opacity: 0,
        },
    },
    newspaper: {
        hidden: {
            transform: "scale(0) rotate(720deg)",
            opacity: 0,
            transition: {
                delay: 0.3,
            },
        },
        visible: {
            transform: " scale(1) rotate(0deg)",
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
        exit: {
            transform: "scale(0) rotate(-720deg)",
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
    },
    flip: {
        hidden: {
            transform: "scale(0) rotateX(-360deg)",
            opacity: 0,
            transition: {
                delay: 0.3,
            },
        },
        visible: {
            transform: " scale(1) rotateX(0deg)",
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
        exit: {
            transform: "scale(0) rotateX(360deg)",
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
    },
    dropIn: {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    },
};

const Modal = ({
    children,
    handleClose,
    type = "fade",
    cancellable = true,
    ...props
}) => {
    return (
        <Backdrop onClick={cancellable ? handleClose : undefined}>
            <ModalStyle
                onClick={e => e.stopPropagation()} // Prevent click from closing modal
                variants={variants[type]}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                    duration: 0.2,
                }}
                {...props}>
                {children}
            </ModalStyle>
        </Backdrop>
    );
};

const ModalStyle = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    /* max-width: 800px; */

    background-color: ${props => props.theme.colours.highlight1};
    padding: 1.875rem 2.5rem;
    border-radius: 0.75rem;
`;

export default Modal;
