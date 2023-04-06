import React, { useEffect, useState } from "react";
import WaitingListAPI from "../api/WaitingListAPI";
import DropDownList from "../components/DropDownList";
import ErrorMessage from "../components/WaitingList/ErrorMessage";
import SuccessMessage from "../components/WaitingList/SuccessMessage";
import styled from "styled-components";
import { Textfield } from "../components/Textfield";
import useRadioButtons from "../hooks/useRadioButtons";
import { educationLevels, occupations, subjectOptions } from "../lib/FormData";
import CenteredRow from "../styles/containers/CenteredRow";
import XForm from "../components/XForm";
import RadioButtonsContainer from "../styles/containers/HorizontalRadioButtonContainer";
import CustomSelect from "../components/CustomSelect";
import { FaEye } from "react-icons/fa";

function Register() {
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

    const register = e => {
        e.preventDefault();
    };

    return (
        <XForm
            onSubmit={register}
            submitButtonText={
                "XTutor for adults sign up now ;) Don't let your wife see this"
            }
            title={"Create your account"}>
            <CenteredRow gap="0.8em">
                <Textfield label="First Name" type="text" required />
                <Textfield label="Last Name" type="text" required />
            </CenteredRow>
            <Textfield label="Email" type="text" required />
            <Textfield label="Password" type="password" required />
            <Textfield label="Confirm Password" type="password" required />
            <RadioButtonsContainer>
                {EducationRadioButtons.RadioButtons}
            </RadioButtonsContainer>
            <CustomSelect
                options={subjectOptions}
                selected={selected}
                setSelected={setSelected}
            />
        </XForm>
    );
}

export default Register;
