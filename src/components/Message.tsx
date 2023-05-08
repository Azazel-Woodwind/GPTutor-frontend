import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/SessionContext";
import GradientOutline from "../styles/GradientOutline";
import { InfoCircle } from "@styled-icons/bootstrap/InfoCircle";

const AvatarStyle = styled.div`
    /* margin-top: 5px; */
    position: relative;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    /* padding: 5px; */
    background-color: ${props => props.theme.colours.secondary};
    ${props =>
        props.type == "system" && props.theme.gradient({ animationLength: 5 })}
    ${props => !props.highlighted && `background-color: white; color: black;`};

    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    box-sizing: border-box;
    border-radius: 20%;
    ${props => props.type === "user" && `padding-bottom: 1px;`}/* ${props =>
        props.type === "assistant" && `padding-top: 1px; padding-left: 2px;`} */
`;

const Avatar = ({ type, highlighted }) => {
    let symbol;
    const { session } = useAuth();

    switch (type) {
        case "assistant":
            symbol = (
                <svg
                    width="17"
                    height="17"
                    style={{ marginLeft: "1px" }}
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.0335 0C10.4246 0 10.7246 0.10412 10.9351 0.311512C11.1448 0.519752 11.25 0.791479 11.25 1.12754C11.25 1.38742 11.1588 1.61766 10.9782 1.81828C10.7992 2.01721 10.5821 2.11625 10.3285 2.11625C10.0435 2.11625 9.83629 2.0553 9.70868 1.93341C9.58023 1.80982 9.44102 1.64052 9.29103 1.42551C8.4665 1.5474 7.52182 2.95767 6.45698 5.65463L6.61277 6.06772C7.2293 7.693 7.73976 8.8544 8.14415 9.55192C8.54854 10.2494 8.93056 10.5982 9.29103 10.5982C9.83215 10.5982 10.2142 9.9921 10.4379 8.77991L11.071 8.87472C10.7992 10.9588 10.0484 12 8.82034 12C8.30989 12 7.89638 11.8815 7.58066 11.6445C7.26659 11.4058 6.94838 10.9605 6.62603 10.3104C6.30285 9.65858 5.85703 8.58945 5.2869 7.10384H5.2637C4.79965 8.51242 4.34222 9.57393 3.89143 10.2867C3.44229 11.0003 3.0263 11.4642 2.64179 11.6783C2.25895 11.8925 1.84379 12 1.39548 12C0.975342 12 0.637246 11.8925 0.381187 11.6783C0.126786 11.4642 0 11.1797 0 10.8251C0 10.5203 0.0894962 10.2689 0.268489 10.07C0.449138 9.86936 0.667078 9.76862 0.921479 9.76862C1.44685 9.76862 1.73192 10.0835 1.77666 10.7133C2.69151 10.9122 3.71078 9.32506 4.83611 5.9526C4.5353 5.12641 4.34056 4.57619 4.25273 4.30023C3.83259 3.13544 3.52101 2.36174 3.31799 1.97743C3.11414 1.59396 2.86388 1.40181 2.56556 1.40181C1.87362 1.40181 1.48995 2.1535 1.41537 3.65688L0.765689 3.6772C0.765689 2.79007 0.941367 1.95626 1.29272 1.17494C1.64574 0.39193 2.26475 0 3.14894 0C3.59973 0 3.96269 0.123589 4.23947 0.369075C4.5179 0.615406 4.74661 0.949774 4.9256 1.37133C5.10625 1.7912 5.3474 2.44639 5.6482 3.33521C5.73604 3.65604 5.87111 4.05474 6.05259 4.53047H6.0758C6.76525 2.76806 7.45138 1.5728 8.13421 0.944695C8.81703 0.314898 9.45013 0 10.0335 0Z"
                        fill="white"
                    />
                </svg>
            );
            break;
        case "user":
            symbol = session.user.user_metadata.first_name
                .charAt(0)
                .toUpperCase();
            break;
        case "system":
            symbol = <InfoCircle size={20} />;
            break;
    }

    return (
        <AvatarStyle highlighted={highlighted} type={type}>
            {symbol}
        </AvatarStyle>
    );
};

const Message = ({ type, message }) => {
    const highlighted = type == "assistant" || type == "system";

    // console.log(type);
    return (
        <GradientOutline contrast hidden={type !== "system"}>
            <Container highlighted={highlighted}>
                <Avatar highlighted={highlighted} type={type} />
                <span> {message} </span>
            </Container>
        </GradientOutline>
    );
};

const Container = styled.div`
    display: flex;
    font-size: 18px;
    padding: 1em;
    color: ${props =>
        props.highlighted
            ? props.theme.colours.primary
            : props.theme.colours.primaryStrong};
    padding-right: 1em;
    span {
        white-space: pre-line;

        max-width: calc(100% - 30px);
        overflow-wrap: break-word;
    }
    ${props =>
        props.highlighted && "background-color: rgb(255, 255, 255, 0.04);"}
`;

export default Message;
