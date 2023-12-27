import React from "react";
import { useAppData } from "@/context/AppDataContext";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import DropdownListNew from "@/components/common/input/DropdownLists/FancyDropdownList/FancyDropdownList";

const activityOptions = ["Discussion", "Quiz", "Revision Notes", "Debate"];

const Window = styled.div`
    width: 70rem;
    height: 30rem;

    border-radius: 1rem;
    background: white;
    /* box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075); */
    display: flex;
    flex-direction: column;

    color: black;
`;

const Nav = styled.nav`
    background: #fdfdfd;
    padding: 0.3rem 0.3rem 0;
    border-radius: 0.7rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid #eeeeee;
    height: 3rem;

    ul,
    li {
        list-style: none;
        font-weight: 500;
        font-size: 1.2rem;
    }

    ul {
        display: flex;
        width: 100%;
        height: 100%;
    }
`;

const Underline = styled(motion.div)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #8855ff;
    z-index: 2;
`;

const Tab = styled.li`
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    width: 100%;
    position: relative;
    background: white;
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    position: relative;
    user-select: none;

    padding: 1.5rem 0;

    ${props =>
        props.selected &&
        css`
            background: #eee;
        `}
`;

const TabContent = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-size: 128px; */
    flex-grow: 1;
    user-select: none;
`;

function SetActivityModalNew() {
    const { subjectOptions, educationLevels, examBoards } = useAppData();

    const [selectedTab, setSelectedTab] = React.useState(activityOptions[0]);
    const [subject, setSubject] = React.useState("");

    return (
        <Window>
            <Nav>
                <ul>
                    {activityOptions.map(activity => (
                        <Tab
                            key={activity}
                            selected={activity === selectedTab}
                            onClick={() => setSelectedTab(activity)}>
                            {activity}
                            {activity === selectedTab ? (
                                <Underline layoutId="underline" />
                            ) : null}
                        </Tab>
                    ))}
                </ul>
            </Nav>
            <TabContent>
                <AnimatePresence mode="wait">
                    <motion.div
                        style={{ color: "black" }}
                        key={selectedTab}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}>
                        {selectedTab}
                        <DropdownListNew
                            label="Choose your subject"
                            options={subjectOptions}
                            selected={subject}
                            setSelected={setSubject}
                            required
                        />
                    </motion.div>
                </AnimatePresence>
            </TabContent>
        </Window>
    );
}

export default SetActivityModalNew;
