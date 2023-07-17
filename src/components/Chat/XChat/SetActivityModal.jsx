import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextWrapper } from "../../../styles/TextWrappers";
import * as z from "zod";
import {
    education_level_schema,
    subject_schema,
} from "../../../lib/userFormSchema";
import RadioButtonsContainer from "../../../styles/containers/RadioButtonContainer";
import RadioButton from "../../input/RadioButton";
import { useAppData } from "../../../context/AppDataContext";
import styled, { css } from "styled-components";
import CenteredColumn from "../../../styles/containers/CenteredColumn";
import CenteredRow from "../../../styles/containers/CenteredRow";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../input/Button";
import DropdownList from "../../input/DropdownList";
import { AnimatePresence, motion } from "framer-motion";
import DropdownListNew from "../../input/DropdownListNew";

const SubjectTopics = {
    Mathematics: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
    Physics: ["Mechanics", "Electricity", "Magnetism", "Thermodynamics"],
    Chemistry: ["Organic", "Inorganic", "Physical", "Analytical"],
    Biology: ["Botany", "Zoology", "Genetics", "Ecology"],
};

function SetActivityModal({ handleClose, X }) {
    const { subjectOptions, educationLevels } = useAppData();

    const SetActivitySchema = React.useMemo(
        () =>
            z.object({
                education_level: education_level_schema(educationLevels),
                subject: subject_schema(subjectOptions),
                topic: z.string().nonempty(),
                activity: z.string().nonempty(),
            }),
        []
    );

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(SetActivitySchema),
        defaultValues: {
            education_level: "",
            subject: "",
            topic: "",
            activity: "",
        },
    });

    const subject = form.watch("subject");

    const onSubmit = async data => {
        if (data.activity === "Discussion") {
            X.sendMessage({
                message: `Let's have a discussion on ${data.topic} from ${data.education_level} ${data.subject}!`,
            });
        } else if (data.activity === "Quiz") {
            X.sendMessage({
                message: `Please quiz me on ${data.topic} from ${data.education_level} ${data.subject}!`,
            });
        } else if (data.activity === "Revision Notes") {
            X.sendMessage({
                message: `Please give me comprehensive revision notes on ${data.topic} from ${data.education_level} ${data.subject}!`,
            });
        } else if (data.activity === "Debate") {
            X.sendMessage({
                message: `Let's have a debate on ${data.topic} from ${data.education_level} ${data.subject}!`,
            });
        }

        handleClose();
    };

    return (
        <ModalContainer fillparent gap="1.25rem">
            <TextWrapper fontSize="xl" fontWeight="bold">
                Set an activity with X!
            </TextWrapper>
            <Content>
                <Controller
                    control={form.control}
                    name="education_level"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <RadioButtonsContainer gap="1.5rem">
                            {educationLevels.map(level => (
                                <RadioButton
                                    key={level}
                                    label={level}
                                    checked={field.value === level}
                                    onChange={e => field.onChange(level)}
                                />
                            ))}
                        </RadioButtonsContainer>
                    )}
                />
                <Controller
                    control={form.control}
                    name="subject"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <DropdownList
                            label="Subject"
                            options={subjectOptions}
                            selected={field.value}
                            setSelected={field.onChange}
                            required
                            error={fieldState.invalid}
                            helperText={
                                fieldState.invalid && fieldState.error?.message
                            }
                            fullwidth
                            style={{ width: "15.6rem" }}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="topic"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <DropdownList
                            label="Topic"
                            options={SubjectTopics[subject] || []}
                            selected={field.value}
                            setSelected={field.onChange}
                            required
                            error={fieldState.invalid}
                            helperText={
                                fieldState.invalid && fieldState.error?.message
                            }
                            fullwidth
                            style={{ width: "15.6rem" }}
                        />
                    )}
                />
                {/* <Controller
                    control={form.control}
                    name="activity"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <DropdownList
                            label="Activity"
                            options={["Discussion", "Quiz", "Revision Notes", "Debate"]}
                            selected={field.value}
                            setSelected={field.onChange}
                            required
                            error={fieldState.invalid}
                            helperText={
                                fieldState.invalid && fieldState.error?.message
                            }
                            fullwidth
                            style={{ width: "15.6rem" }}
                        />
                    )}
                /> */}
                <Controller
                    control={form.control}
                    name="activity"
                    render={({
                        field, // { onChange, onBlur, value, name, ref }
                        fieldState, //{ invalid, isTouched, isDirty, error }
                        formState,
                    }) => (
                        <RadioButtonsContainer gap="1.5rem">
                            {[
                                "Discussion",
                                "Quiz",
                                "Revision Notes",
                                "Debate",
                            ].map(activity => (
                                <RadioButton
                                    key={activity}
                                    label={activity}
                                    checked={field.value === activity}
                                    onChange={e => field.onChange(activity)}
                                />
                            ))}
                        </RadioButtonsContainer>
                    )}
                />
            </Content>
            <ButtonRow>
                <Button onClick={handleClose} type="error">
                    <TextWrapper fontSize="lg">Cancel</TextWrapper>
                </Button>
                <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={
                        !form.formState.isValid ||
                        form.formState.isSubmitting ||
                        X.streaming ||
                        X.loading
                    }>
                    <TextWrapper fontSize="lg">Confirm</TextWrapper>
                </Button>
            </ButtonRow>
        </ModalContainer>
    );
}

const ModalContainer = styled(CenteredColumn)`
    /* justify-content: flex-start; */
    flex: 1;
    position: relative;
`;

const Content = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    gap: 1.25rem;
`;

const ButtonRow = styled(CenteredRow)`
    gap: 2.5rem;
`;

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

function SetActivityModalNew({}) {
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
