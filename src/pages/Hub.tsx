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
import Avatar from "../styles/Avatar";
import useRadioButtons from "../hooks/useRadioButtons";
import SubmitButton from "../components/Button";
import Chat from "../components/Chat";

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
    height: 100%;
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
                <h1> homepage ;)</h1>
            </Column>
        </Centerer>
    );
}

export default WaitingList;
