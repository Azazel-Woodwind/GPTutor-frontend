import React from "react";
import {
    unstable_useBlocker as useBlocker,
    useNavigate,
} from "react-router-dom";
import useModal from "../hooks/useModal";
import ExitCreateLessonModal from "./CreateLesson/ExitCreateLessonModal";

function Prompt({ when, confirmed, setConfirmed, children }) {
    const [nextLocation, setNextLocation] = React.useState(null);

    const navigate = useNavigate();

    const block = when;
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: false,
    });

    useBlocker(args => {
        // console.log(args);
        if (!confirmed && block) {
            // console.log("here");
            setNextLocation(args.nextLocation.pathname);
            handleOpen();
            return true;
        }
        return false;
    });

    React.useEffect(() => {
        if (confirmed) {
            navigate(nextLocation);
        } else if (confirmed === false) {
            // console.log("here");
            handleClose();
            setConfirmed(undefined);
        }
    }, [confirmed]);

    return (
        <Modal key={block} {...ModalProps} type="dropIn">
            {children}
        </Modal>
    );
}

export function usePrompt() {
    const [confirmed, setConfirmed] = React.useState(undefined);

    return {
        Prompt,
        PromptProps: {
            confirmed,
            setConfirmed,
        },
        confirmed,
        setConfirmed,
    };
}

export default Prompt;
