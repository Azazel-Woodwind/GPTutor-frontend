import styled from "styled-components";
import { motion } from "framer-motion";

const TestButton = styled.button`
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
    @keyframes gradient {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }

    background: rgb(88, 227, 254);
    background: -moz-linear-gradient(
        90deg,
        rgba(88, 227, 254, 1) 0%,
        rgba(36, 170, 255, 1) 25%,
        rgba(1, 99, 255, 1) 75%,
        rgba(88, 227, 254, 1) 100%
    );
    background: -webkit-linear-gradient(
        90deg,
        rgba(88, 227, 254, 1) 0%,
        rgba(36, 170, 255, 1) 25%,
        rgba(1, 99, 255, 1) 75%,
        rgba(88, 227, 254, 1) 100%
    );
    background: linear-gradient(
        90deg,
        rgba(88, 227, 254, 1) 0%,
        rgba(36, 170, 255, 1) 25%,
        rgba(1, 99, 255, 1) 75%,
        rgba(88, 227, 254, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#58e3fe",endColorstr="#58e3fe",GradientType=1);
    background-size: 800% auto;
    animation: gradient 5s linear infinite;
    border-radius: 10px;
`;

const CustomButton = props => {
    return (
        <TestButton
            as={motion.button}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            {...props}>
            {props.children}
        </TestButton>
    );
};

export default CustomButton;
