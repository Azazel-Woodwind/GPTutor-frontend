import CenteredColumn from "../../styles/containers/CenteredColumn";
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import Button from "../../components/input/Button";
import DropdownList from "../../components/input/DropdownList";
import { useAppData } from "../../context/AppDataContext";
import DropdownListNew from "../../components/input/DropdownListNew";

const options = ["OPTION 1", "OPTION 2", "OPTION 3"];

function Test1() {
    const { subjectOptions, educationLevels, examBoards } = useAppData();
    const controls = useAnimationControls();
    const [selected, setSelected] = React.useState("");

    // console.log(subjectOptions);

    return (
        <CenteredColumn fillparent gap="0.625rem">
            {/* <ProgressBar
                width="500px"
                stops={[
                    {
                        label: "average lesson",
                        location: 2000,
                    },
                    {
                        label: "1/4",
                        location: (max / 4) * 1,
                    },
                    {
                        label: "1/2",
                        location: (max / 4) * 2,
                    },
                    {
                        label: "3/4",
                        location: (max / 4) * 3,
                    },
                    {
                        label: "No more usage",
                        location: max,
                    },
                ]}
                value={current}
                max={max}
            /> */}
            <div
                style={{
                    display: "flex",
                }}>
                {/* <DropdownList
                    label="Dropdown"
                    options={subjectOptions}
                    selected={selected}
                    setSelected={setSelected}
                /> */}
                <DropdownListNew
                    label="Dropdown"
                    options={subjectOptions}
                    // options={options}
                    selected={selected}
                    setSelected={setSelected}
                    required
                />
            </div>
            {/* <motion.div
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "red",
                }}
                animate={{ rotate: 90, scale: 1.5 }}
                transition={{
                    duration: 2,
                    from: 5,
                }}></motion.div> */}
        </CenteredColumn>
    );
}

export default Test1;
