import CenteredColumn from "../../styles/containers/CenteredColumn";
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import Button from "../../components/input/Button";
import DropdownList from "../../components/input/DropdownList";
import { useAppData } from "../../context/AppDataContext";
import DropdownListNew from "../../components/input/DropdownListNew";
import XAvatar from "../../components/XAvatar";
import styled from "styled-components";
import CollapsableText from "../../components/CollapsableText";

const options = ["OPTION 1", "OPTION 2", "OPTION 3"];

function Test1() {
    const { subjectOptions, educationLevels, examBoards } = useAppData();
    const controls = useAnimationControls();
    const [selected, setSelected] = React.useState("");

    // console.log(subjectOptions);
    const [open, setOpen] = React.useState(true);
    const [closed, setClosed] = React.useState(false);

    return (
        <CenteredColumn border fillparent gap="0.625rem">
            <Container>
                <CollapsableText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl quis aliquam ultricies, nunc nisl ultrices
                    odio, quis ultricies nisl nunc eget nunc. Sed euismod, nisl
                    quis aliquam ultricies, nunc nisl ultrices odio, quis
                    ultricies nisl nunc eget nunc. Sed euismod, nisl quis
                    aliquam ultricies, nunc nisl ultrices odio, quis ultricies
                    nisl nunc eget nunc. Sed euismod, nisl quis aliquam
                    ultricies, nunc nisl ultrices odio, quis ultricies nisl nunc
                    eget nunc. Sed euismod, nisl quis aliquam ultricies, nunc
                    nisl ultrices odio, quis ultricies nisl nunc eget nunc.
                </CollapsableText>
            </Container>
            {/* <TestContainer
                animate={open ? "open" : "closed"}
                initial={false}
                variants={{
                    open: { maxHeight: "20rem" },
                    closed: {
                        maxHeight: "3.25rem",
                        // whiteSpace: "nowrap",
                        // textOverflow: "ellipsis",
                    },
                }}
                onAnimationComplete={() => setClosed(!closed)}
                closed={closed}
                open={open}
                onClick={() => setOpen(!open)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nisl quis aliquam ultricies, nunc nisl ultrices odio,
                quis ultricies nisl nunc eget nunc. Sed euismod, nisl quis
                aliquam ultricies, nunc nisl ultrices odio, quis ultricies nisl
                nunc eget nunc. Sed euismod, nisl quis aliquam ultricies, nunc
                nisl ultrices odio, quis ultricies nisl nunc eget nunc. Sed
                euismod, nisl quis aliquam ultricies, nunc nisl ultrices odio,
                quis ultricies nisl nunc eget nunc. Sed euismod, nisl quis
                aliquam ultricies, nunc nisl ultrices odio, quis ultricies nisl
                nunc eget nunc.
            </TestContainer> */}
        </CenteredColumn>
    );
}

const TestContainer = styled(motion.div)`
    width: 600px;
    padding: 1rem;
    line-height: 1.25rem;
    background-color: rgba(255, 255, 255, 0.1);
    overflow: hidden;

    ${props =>
        props.closed &&
        !props.open &&
        `
        white-space: nowrap;
        text-overflow: ellipsis;
    `}
`;

const Container = styled.div`
    width: 600px;
`;

export default Test1;
