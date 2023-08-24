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
import ImageCarousel from "../../components/ImageCarousel";

const options = ["OPTION 1", "OPTION 2", "OPTION 3"];

const images = [
    "https://cdn.discordapp.com/attachments/1084532696732139790/1132026121169424515/5.png",
    "https://cdn.discordapp.com/attachments/1084532696732139790/1132026121425268756/6.png",
];

function Test1() {
    const [clicked, setClicked] = React.useState(false);

    return (
        <CenteredColumn border fillparent gap="0.625rem">
            <motion.div
                variants={{
                    clicked: {
                        fontSize: "2rem",
                    },
                    unclicked: {
                        fontSize: "1rem",
                    },
                }}
                animate={clicked ? "clicked" : "unclicked"}>
                Hello
            </motion.div>
            <Button onClick={() => setClicked(prev => !prev)}>Click me</Button>
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
