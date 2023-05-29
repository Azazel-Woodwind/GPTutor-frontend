import React from "react";
import { TextWrapper } from "../../styles/TextWrappers";

function CorrectFeedback({ correctFeedback }) {
    return (
        <p>
            <TextWrapper mainGradient>{correctFeedback}</TextWrapper>
        </p>
    );
}

export default CorrectFeedback;
