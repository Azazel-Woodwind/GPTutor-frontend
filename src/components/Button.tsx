import styled from "styled-components";
import { motion } from "framer-motion";

const CustomButtonStyle = styled.button`
    cursor: pointer;

    border: unset;
    outline: unset;

    padding: 1em;
    padding-right: 2em;
    padding-left: 2em;
    border-radius: 5px;
    min-width: ${props => (props.width ? props.width : "10em")};
    color: white;
    z-index: 10;
    font-size: 16px;
    ${props => props.theme.gradient({ animationLength: 5 })}
    background-size: 800% auto;

    border-radius: 10px;
`;

const CustomButton = props => {
    return (
        <CustomButtonStyle
            as={motion.button}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            {...props}>
            {props.children}
        </CustomButtonStyle>
    );
};

export default CustomButton;
