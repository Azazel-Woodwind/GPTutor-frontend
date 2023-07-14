import CenteredColumn from "../../styles/containers/CenteredColumn";
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import Button from "../../components/input/Button";
import DropdownList from "../../components/input/DropdownList";
import { useAppData } from "../../context/AppDataContext";
import DropdownListNew from "../../components/input/DropdownListNew";
import XAvatar from "../../components/XAvatar";

const options = ["OPTION 1", "OPTION 2", "OPTION 3"];

function Test1() {
    const { subjectOptions, educationLevels, examBoards } = useAppData();
    const controls = useAnimationControls();
    const [selected, setSelected] = React.useState("");

    // console.log(subjectOptions);

    return (
        <CenteredColumn fillparent gap="0.625rem">
            <XAvatar />
        </CenteredColumn>
    );
}

export default Test1;
