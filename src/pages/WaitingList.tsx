import { useEffect, useState, useRef } from "react";
import WaitingListAPI from "../api/WaitingListAPI";
import { Textfield } from "../components/Textfield";
import useRadioButtons from "../hooks/useRadioButtons";
import { occupations } from "../lib/FormData";
import CenteredRow from "../styles/containers/CenteredRow";
import XForm from "../components/XForm";
import RadioButtonsContainer from "../styles/containers/HorizontalRadioButtonContainer";
import { toast } from "react-toastify";
import Avatar from "../components/Avatar";
import useCustomSelect from "../hooks/useCustomSelect";
import CenteredColumn from "../styles/containers/CenteredColumn";
import { useLoaderData } from "react-router-dom";
import { MultiTextfieldRow } from "../styles/containers/MultiTextfieldRow";
import {
    CONTAINS_LOWERCASE_REGEX,
    CONTAINS_NUMBER_REGEX,
    CONTAINS_SPECIAL_CHARACTER_REGEX,
    CONTAINS_UPPERCASE_REGEX,
    EMAIL_REGEX,
    NAME_REGEX,
    PASSWORD_LENGTH_REGEX,
} from "../lib/regexes";
import Notification from "./Notification";

function WaitingList() {
    const { subjectOptions, educationLevels } = useLoaderData();

    const [firstName, setFirstName] = useState("");
    const [isValidFirstName, setIsValidFirstName] = useState(null);
    const [showFirstNameError, setShowFirstNameError] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [isValidLastName, setIsValidLastName] = useState(null);
    const [showLastNameError, setShowLastNameError] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (firstName.length === 0) {
            setIsValidFirstName(null);
            return;
        }

        const result = NAME_REGEX.test(firstName);
        console.log(firstName);
        console.log(result);
        setIsValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        console.log(!isValidFirstName && firstName.length > 0);
        setShowFirstNameError(!isValidFirstName && firstName.length > 0);
    }, [isValidFirstName]);

    useEffect(() => {
        if (lastName.length === 0) {
            setIsValidLastName(null);
            return;
        }

        const result = NAME_REGEX.test(lastName);
        console.log(lastName);
        console.log(result);
        setIsValidLastName(result);
    }, [lastName]);

    useEffect(() => {
        console.log(!isValidLastName && lastName.length > 0);
        setShowLastNameError(!isValidLastName && lastName.length > 0);
    }, [isValidLastName]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setIsValidEmail(result);
    }, [email]);

    const EducationRadioButtons = useRadioButtons(
        educationLevels.map(level => ({
            value: level.toLowerCase(),
            label: level,
        }))
    );

    const [selectedSubjects, Select] = useCustomSelect({
        options: subjectOptions,
    });

    const OccupationRadioButtons = useRadioButtons(
        occupations.map(occupation => ({
            value: occupation.toLowerCase(),
            label: occupation,
        }))
    );

    const formIsInvalid = () => {
        return (
            !isValidEmail ||
            !isValidFirstName ||
            !isValidLastName ||
            !EducationRadioButtons.selected ||
            selectedSubjects.length === 0 ||
            !OccupationRadioButtons.selected
        );
    };

    const validateAllData = () => {
        return (
            EMAIL_REGEX.test(email) &&
            NAME_REGEX.test(firstName) &&
            NAME_REGEX.test(lastName) &&
            EducationRadioButtons.selected &&
            selectedSubjects.length > 0 &&
            OccupationRadioButtons.selected
        );
    };

    const addToWaitingList = async e => {
        e.preventDefault();

        if (!validateAllData()) {
            toast.error("Fill in all the FUCKING fields.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        try {
            const response = await WaitingListAPI.addUser({
                first_name: firstName,
                last_name: lastName,
                email: email,
                education_level: EducationRadioButtons.selected.toLowerCase(),
                is_student: OccupationRadioButtons.selected === "Student",
                subjects: selectedSubjects.map(subject =>
                    subject.replaceAll(" ", "_").toLowerCase()
                ),
            });

            console.log(response);
            setSuccess(true);
        } catch (error) {
            console.log(error);

            toast.error("Something went wrong?", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <>
            {success ? (
                <Notification
                    heading="Thanks for signing up to our waiting list!"
                    caption="Be sure to check your email for the latest updates on XTutor!"
                />
            ) : (
                <XForm
                    onSubmit={addToWaitingList}
                    // submitButtonText={
                    //     "WARNING: Do NOT let your wife CATCH you using THIS application"
                    // }
                    submitButtonText={"Join the XTutor Waiting List!"}
                    title="Join the Waiting List!"
                    buttonProps={{
                        disabled: formIsInvalid(),
                    }}>
                    <MultiTextfieldRow gap="0.8em">
                        <Textfield
                            label="First Name"
                            type="text"
                            required
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            error={showFirstNameError}
                            helperText={
                                showFirstNameError &&
                                firstNameFocus &&
                                "Enter a valid forename"
                            }
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                            fullwidth
                        />
                        <Textfield
                            label="Last Name"
                            type="text"
                            required
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            error={showLastNameError}
                            helperText={
                                showLastNameError &&
                                lastNameFocus &&
                                "Enter a valid surname"
                            }
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                            fullwidth
                        />
                    </MultiTextfieldRow>
                    <Textfield
                        label="Email"
                        type="text"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        error={!isValidEmail && email.length > 0}
                        helperText={
                            !isValidEmail &&
                            email &&
                            emailFocus &&
                            "Enter a valid email"
                        }
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    {/* <Textfield label="Email" type="text" required /> */}
                    <RadioButtonsContainer>
                        {EducationRadioButtons.RadioButtons}
                    </RadioButtonsContainer>
                    {Select}
                    <RadioButtonsContainer>
                        {OccupationRadioButtons.RadioButtons.map(element => (
                            <div style={{ width: "100px" }}>{element}</div>
                        ))}
                    </RadioButtonsContainer>
                </XForm>
            )}
        </>
    );
}

export default WaitingList;
