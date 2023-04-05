import React, { useEffect, useState } from "react";
import WaitingListAPI from "../api/WaitingListAPI";
import DropDownList from "../components/DropDownList";
import MultiSelect from "../components/MultiSelect";
import RadioButton from "../components/RadioButton";
import ErrorMessage from "../components/WaitingList/ErrorMessage";
import SuccessMessage from "../components/WaitingList/SuccessMessage";
import PageWrapper from "../styles/PageWrapper";
import styled from "styled-components";
import { Textfield } from "../components/Textfield";
import CustomSelect from "../components/CustomSelect";
import Avatar from "../styles/Avatar";
import useRadioButtons from "../hooks/useRadioButtons";
import SubmitButton from "../components/Button";

const AvatarContainer = styled.div`
    /* border: 5px solid red; */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    flex-grow: 1;
`;

const FormContainer = styled.form`
    top: 10em;
    right: 5em;
    z-index: 10;
    width: 30em;
`;

const RadioButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2em;
    margin: 1.2em 0;
    width: 100%;
`;

const Centerer = styled.div`
    ${props => props.theme.utils.centeredColumn}
    ${props => props.theme.utils.fillParent} /* border: 5px solid red; */
`;

const ContentContainer = styled.div`
    ${props => props.theme.utils.centeredRow}
    gap: 20em;
    flex-wrap: wrap;
    /* border: 5px solid blue; */
`;

const MainContainer = styled.div`
    /* border: 5px solid green; */
    flex-grow: 1;

    ${props => props.theme.utils.centeredColumn}
    gap: 0.2em;
`;

const Title = styled.h1`
    margin-right: 0.2em;
    font-size: 2.2em;
`;

const Column = styled.div`
    ${props => props.theme.utils.centeredColumn}
    gap: 3rem;
    /* border: 5px solid red; */
`;

const Subheading = styled.div`
    font-size: 1.8em;
`;

const Copyright = styled.div``;

const options = [
    "Art",
    "Biology",
    "Business",
    "Chemistry",
    "Computer Science",
    "English Literature",
    "Geography",
    "History",
    "Home Economics",
    "ICT",
    "Religious Studies",
    "Maths",
    "Music",
    "Physical Education",
    "Science",
];

const occupations = ["Teacher", "Student"];

const educationLevels = ["KS3", "GCSE", "A-level"];

function WaitingList() {
    const [educationLevel, setEducationLevel] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [isStudent, setIsStudent] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setErrorMessage("");
    }, [educationLevel, selectedSubjects, firstName, email, isStudent]);

    const EducationRadioButtons = useRadioButtons(
        educationLevels.map(level => ({
            value: level.toLowerCase(),
            label: level,
        }))
    );

    const OccupationRadioButtons = useRadioButtons(
        occupations.map(occupation => ({
            value: occupation.toLowerCase(),
            label: occupation,
        }))
    );

    return (
        <Centerer>
            <Column>
                <ContentContainer>
                    <AvatarContainer>
                        <Avatar size={190} hasLogo />
                    </AvatarContainer>
                    <MainContainer>
                        <Title>Sign up to our waiting list</Title>
                        <FormContainer>
                            <Textfield label="First Name" type="text" />
                            <Textfield label="Email" type="text" required />
                            <RadioButtonsContainer>
                                {EducationRadioButtons.RadioButtons}
                            </RadioButtonsContainer>
                            <CustomSelect
                                options={options}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <RadioButtonsContainer>
                                {OccupationRadioButtons.RadioButtons}
                            </RadioButtonsContainer>
                            <SubmitButton width={"100%"}>
                                XTutor for adults sign up now ;) Don't let your
                                wife see this
                            </SubmitButton>
                        </FormContainer>
                    </MainContainer>
                </ContentContainer>
                <Subheading>REVOLUTIONISING EDUCATION</Subheading>
            </Column>
        </Centerer>
    );
}

export default WaitingList;
