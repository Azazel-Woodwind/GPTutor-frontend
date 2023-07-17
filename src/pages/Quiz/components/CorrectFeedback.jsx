import React from "react";
import { TextWrapper } from "../../../styles/TextWrappers";

function CorrectFeedback({ correctFeedback }) {
    return (
        <p>
            <TextWrapper color="rgb(0, 255, 0)">{correctFeedback}</TextWrapper>
        </p>
    );
}

export default CorrectFeedback;
