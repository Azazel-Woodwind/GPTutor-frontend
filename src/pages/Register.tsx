import React, { useEffect, useRef, useState } from "react";
import { Textfield } from "../components/Textfield";
import useRadioButtons from "../hooks/useRadioButtons";
import CenteredRow from "../styles/containers/CenteredRow";
import XForm from "../components/XForm";
import RadioButtonsContainer from "../styles/containers/HorizontalRadioButtonContainer";
import useCustomSelect from "../hooks/useCustomSelect";
import { toast } from "react-toastify";
import UserAPI from "../api/UserAPI";
import Centerer from "../styles/containers/Centerer";
import CenteredColumn from "../styles/containers/CenteredColumn";
import Avatar from "../components/Avatar";
import { Link, useLoaderData } from "react-router-dom";
import { LinkWrapper, TextWrapper } from "../styles/TextWrappers";
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

function Register() {
    const { subjectOptions, educationLevels } = useLoaderData();

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [isValidFirstName, setIsValidFirstName] = useState(null);
    const [showFirstNameError, setShowFirstNameError] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [isValidLastName, setIsValidLastName] = useState(null);
    const [showLastNameError, setShowLastNameError] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [passwordCorrectLength, setPasswordCorrectLength] = useState(false);
    const [passwordContainsUppercase, setPasswordContainsUppercase] =
        useState(false);
    const [passwordContainsLowercase, setPasswordContainsLowercase] =
        useState(false);
    const [passwordContainsNumber, setPasswordContainsNumber] = useState(false);
    const [
        passwordContainsSpecialCharacter,
        setPasswordContainsSpecialCharacter,
    ] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [isValidMatch, setIsValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess] = useState(false);

    const EducationRadioButtons = useRadioButtons(
        educationLevels.map(level => ({
            value: level.toLowerCase(),
            label: level,
        }))
    );

    const [selectedSubjects, Select] = useCustomSelect({
        options: subjectOptions,
    });

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setIsValidEmail(result);
    }, [email]);

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
        const isCorrectLength = PASSWORD_LENGTH_REGEX.test(password);
        const containsLowerCase = CONTAINS_LOWERCASE_REGEX.test(password);
        const containsUpperCase = CONTAINS_UPPERCASE_REGEX.test(password);
        const containsNumber = CONTAINS_NUMBER_REGEX.test(password);
        const containsSpecialCharacter =
            CONTAINS_SPECIAL_CHARACTER_REGEX.test(password);
        setPasswordCorrectLength(isCorrectLength);
        setPasswordContainsLowercase(containsLowerCase);
        setPasswordContainsUppercase(containsUpperCase);
        setPasswordContainsNumber(containsNumber);
        setPasswordContainsSpecialCharacter(containsSpecialCharacter);
        setIsValidPassword(
            isCorrectLength &&
                containsLowerCase &&
                containsUpperCase &&
                containsNumber &&
                containsSpecialCharacter
        );
    }, [password]);

    useEffect(() => {
        setIsValidMatch(password === matchPassword && isValidPassword);
    }, [matchPassword]);

    const validateAllData = () => {
        return (
            EMAIL_REGEX.test(email) &&
            NAME_REGEX.test(firstName) &&
            NAME_REGEX.test(lastName) &&
            PASSWORD_LENGTH_REGEX.test(password) &&
            CONTAINS_LOWERCASE_REGEX.test(password) &&
            CONTAINS_UPPERCASE_REGEX.test(password) &&
            CONTAINS_NUMBER_REGEX.test(password) &&
            CONTAINS_SPECIAL_CHARACTER_REGEX.test(password) &&
            password === matchPassword &&
            EducationRadioButtons.selected &&
            selectedSubjects.length > 0
        );
    };

    const formIsInvalid = () => {
        return (
            !isValidEmail ||
            !isValidFirstName ||
            !isValidLastName ||
            !isValidPassword ||
            !isValidMatch ||
            !EducationRadioButtons.selected ||
            selectedSubjects.length === 0
        );
    };

    const getInvalidFields = () => {
        let invalidFields = [
            [!isValidFirstName, "First Name"],
            [!isValidLastName, "Last Name"],
            [!isValidEmail, "Email"],
            [!isValidPassword, "Password"],
            [!isValidMatch, "Confirm Password"],
        ];
        invalidFields = invalidFields
            .filter(field => field[0])
            .map(field => field[1]);
        return invalidFields.join(", ");
    };

    const register = async e => {
        e.preventDefault();

        if (!validateAllData) {
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
            const response = await UserAPI.signUp({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                education_level: EducationRadioButtons.selected.toLowerCase(),
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
                    heading="Thanks for signing up!"
                    caption="Please check your inbox to confirm your email."
                />
            ) : (
                <XForm
                    onSubmit={register}
                    submitButtonText={
                        "WARNING: Do NOT let your wife CATCH you using THIS application"
                    }
                    title={"Create your account"}
                    link={
                        <Link to="/login">
                            <TextWrapper>
                                <LinkWrapper>
                                    Already have an account?
                                </LinkWrapper>
                            </TextWrapper>
                        </Link>
                    }
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
                            fullwidth
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
                    <Textfield
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={!isValidPassword && password.length > 0}
                        helperText={
                            !isValidPassword &&
                            password &&
                            passwordFocus &&
                            "Enter a valid password"
                        }
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <Textfield
                        label="Confirm Password"
                        type="password"
                        required
                        value={matchPassword}
                        onChange={e => setMatchPassword(e.target.value)}
                        error={!isValidMatch && matchPassword.length > 0}
                        helperText={
                            !isValidMatch &&
                            matchPassword &&
                            matchFocus &&
                            "Must match a valid password"
                        }
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <RadioButtonsContainer>
                        {EducationRadioButtons.RadioButtons}
                    </RadioButtonsContainer>
                    {Select}
                </XForm>
            )}
        </>
    );
}

export default Register;
