import React, { useEffect, useState } from "react";
import WaitingListAPI from "../api/WaitingListAPI";
import DropDownList from "../components/DropDownList";
import ErrorMessage from "../components/WaitingList/ErrorMessage";
import SuccessMessage from "../components/WaitingList/SuccessMessage";
import styled from "styled-components";
import { Textfield } from "../components/Textfield";
import CustomSelect from "../components/CustomSelect";
import useRadioButtons from "../hooks/useRadioButtons";
import { educationLevels, occupations, subjectOptions } from "../lib/FormData";
import CenteredRow from "../styles/containers/CenteredRow";
import XForm from "../components/XForm";
import RadioButtonsContainer from "../styles/containers/HorizontalRadioButtonContainer";

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

    const addToWaitingList = e => {
        e.preventDefault();
    };

    return (
        <XForm
            onSubmit={addToWaitingList}
            submitButtonText={
                "XTutor for adults sign up now ;) Don't let your wife see this"
            }
            title="Join the Waiting List!">
            <CenteredRow gap="0.8em">
                <Textfield label="First Name" type="text" required />
                <Textfield label="Last Name" type="text" required />
            </CenteredRow>
            <Textfield label="Email" type="text" required />
            <RadioButtonsContainer>
                {EducationRadioButtons.RadioButtons}
            </RadioButtonsContainer>
            <CustomSelect
                options={subjectOptions}
                selected={selected}
                setSelected={setSelected}
            />
            <RadioButtonsContainer>
                {OccupationRadioButtons.RadioButtons}
            </RadioButtonsContainer>
        </XForm>
    );
}

export default WaitingList;
