import React, { useEffect, useState } from "react";
import WaitingListAPI from "../api/WaitingListAPI";
import DropDownList from "../components/DropDownList";
import MultiSelect from "../components/MultiSelect";
import RadioButton from "../components/RadioButton";
import ErrorMessage from "../components/WaitingList/ErrorMessage";
import SuccessMessage from "../components/WaitingList/SuccessMessage";
import PageWrapper from "../styles/Ellipses";
import styled from "styled-components";
import { Textfield } from "../components/Textfield";
import CustomSelect from "../components/CustomSelect";
import useRadioButtons from "../hooks/useRadioButtons";
import SubmitButton from "../components/Button";
import Avatar from "../components/Avatar";

const AvatarContainer = styled.div`
    position: relative;
    width: 30vw;
    height: 50vh;
`;

const FormContainer = styled.form`
    top: 10em;
    right: 5em;
    z-index: 10;
    width: 30em;
`;

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

const RadioButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2em;
    margin: 1.2em 0;
    width: 100%;
`;

const Centerer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10em;
    flex-wrap: wrap;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2em;
`;

const Title = styled.h1`
    margin-right: 0.2em;
    font-size: 2.2em;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
`;

const Subheading = styled.div`
    font-size: 1.8em;
`;

const Copyright = styled.div``;

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

    const EducationRadioButtons = useRadioButtons([
        {
            value: "remember",
            label: "Remember Me",
        },
    ]);

    return (
        <Centerer>
            <Column>
                <ContentContainer>
                    <AvatarContainer>
                        <Avatar size={190} />
                    </AvatarContainer>
                    <MainContainer>
                        <Title>Login to XTutor</Title>
                        <p>
                            Don't have an account? <a> Sign up </a> here to get
                            started. XTutor.
                        </p>
                        <FormContainer>
                            <Textfield label="Email" type="text" required />
                            <Textfield label="Password" type="text" required />
                            <RadioButtonsContainer>
                                {EducationRadioButtons.RadioButtons}
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
