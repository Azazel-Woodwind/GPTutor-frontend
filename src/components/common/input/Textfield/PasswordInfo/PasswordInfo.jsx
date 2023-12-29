import styled from "styled-components";
import {
    CONTAINS_LOWERCASE_REGEX,
    CONTAINS_NUMBER_REGEX,
    CONTAINS_SPECIAL_CHARACTER_REGEX,
    CONTAINS_UPPERCASE_REGEX,
    PASSWORD_LENGTH_REGEX,
} from "@/lib/regexes";
import PasswordInfoEntry from "./PasswordInfoEntry";

function PasswordInfo({ password }) {
    return (
        <PasswordInfoContainer>
            <PasswordInfoEntry
                correct={PASSWORD_LENGTH_REGEX.test(password)}
                text="Password must be between 8 and 24 characters"
            />
            <PasswordInfoEntry
                correct={CONTAINS_LOWERCASE_REGEX.test(password)}
                text="Password must contain at least 1 lowercase letter"
            />
            <PasswordInfoEntry
                correct={CONTAINS_UPPERCASE_REGEX.test(password)}
                text="Password must contain at least 1 uppercase letter"
            />
            <PasswordInfoEntry
                correct={CONTAINS_NUMBER_REGEX.test(password)}
                text="Password must contain at least 1 number"
            />
            <PasswordInfoEntry
                correct={CONTAINS_SPECIAL_CHARACTER_REGEX.test(password)}
                text="Password must contain at least 1 special character"
            />
        </PasswordInfoContainer>
    );
}

const PasswordInfoContainer = styled.div`
    box-shadow: rgba(76, 72, 72, 0.5) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    padding: 0.625em;
    display: flex;
    flex-direction: column;
    gap: 0.625em;
`;

export default PasswordInfo;
