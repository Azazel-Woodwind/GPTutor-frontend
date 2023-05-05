import React from "react";
import {
    unstable_useBlocker as useBlocker,
    useNavigate,
} from "react-router-dom";
import useModal from "../hooks/useModal";
import ExitCreateLessonModal from "./CreateLesson/ExitCreateLessonModal";

function Prompt(props) {
    const [nextLocation, setNextLocation] = React.useState(null);
    const [confirmed, setConfirmed] = React.useState(false);

    const navigate = useNavigate();

    const block = props.when;
    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: false,
    });

    useBlocker(args => {
        // console.log(args);
        if (!confirmed && block) {
            setNextLocation(args.nextLocation.pathname);
            handleOpen();
            return true;
        }
        return false;
    });

    React.useEffect(() => {
        if (confirmed) {
            navigate(nextLocation);
        }
    }, [confirmed]);

    return (
        <Modal key={block} {...ModalProps} type="dropIn">
            <ExitCreateLessonModal
                nextLocation={nextLocation}
                handleClose={handleClose}
                setConfirmed={setConfirmed}
            />
        </Modal>
    );
}

export default Prompt;
