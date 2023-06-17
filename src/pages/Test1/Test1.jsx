import CenteredColumn from "../../styles/containers/CenteredColumn";
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import Button from "../../components/input/Button";

function Test1() {
    const controls = useAnimationControls();

    return (
        <CenteredColumn fillparent gap="10px" style={{ overflow: "hidden" }}>
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
            <motion.div
                initial={{ opacity: 0 }}
                animate={controls}
                transition={{
                    repeat: 1,
                    repeatType: "reverse",
                    duration: 1,
                    // repeatDelay: 1,
                }}>
                HELLO THERE
            </motion.div>
            <Button
                onClick={() => {
                    controls.start({ opacity: 1 });
                }}>
                Click me
            </Button>
        </CenteredColumn>
    );
}

export default Test1;
