import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import styled from "styled-components";
import { variants } from "./Modal.utils";

const ModalContainer = styled(motion.div)`
    position: relative;
    width: fit-content;
    height: fit-content;
`;

const ModalStyle = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    /* max-width: 800px; */

    background-color: ${props => props.theme.colours.highlight1};
    padding: 1.875rem 2.5rem;
    border-radius: 0.75rem;
`;

function ModalContents({
    children,
    handleClose,
    type = "fade",
    cancellable = true,
    defaultModal = true,
    ...props
}) {
    return (
        <Backdrop onClick={cancellable ? handleClose : undefined}>
            <ModalContainer
                onClick={e => e.stopPropagation()} // Prevent click from closing modal
                variants={variants[type]}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                    duration: 0.2,
                }}
                {...props}>
                {defaultModal ? (
                    <ModalStyle>{children}</ModalStyle>
                ) : (
                    <>{children}</>
                )}
            </ModalContainer>
        </Backdrop>
    );
}

export default ModalContents;
