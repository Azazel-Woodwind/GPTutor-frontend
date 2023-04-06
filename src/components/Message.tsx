import React from "react";
import styled from "styled-components";

const AvatarStyle = styled.div`
    width: 1ch;
    height: 1ch;
    padding: 1ch;
    background-color: rgb(0, 0, 0, 0.2);
    background-color: rgb(255, 255, 255, 0.1);
    ${props => {
        console.log(props);
    }}
    margin-right: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
    box-sizing: unset;
    font-style: italic;
`;

const Avatar = ({ type }) => {
    var symbol;

    switch (type) {
        case "X":
            symbol = "X";
            break;
        case "USER":
            symbol = "U";
            break;
        case "SYSTEM":
            symbol = "S";
            break;
    }

    return <AvatarStyle> X </AvatarStyle>;
};
const Message = ({ type, message }) => {
    const highlighted = type == "X" || type == "SYSTEM";
    console.log(highlighted);
    return (
        <Container highlighted={highlighted}>
            <Avatar highlighted={highlighted} type={type} />
            <span> {message} </span>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 1em;
    color: ${props =>
        props.highlighted
            ? props.theme.colours.primary
            : props.theme.colours.primaryStrong};
    padding-right: 1em;
    span {
        flex-grow: 1;
    }
    ${props =>
        props.highlighted && "background-color: rgb(255, 255, 255, 0.03);"}
`;
export default Message;
