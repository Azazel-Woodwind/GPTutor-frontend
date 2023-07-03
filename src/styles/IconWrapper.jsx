import styled from "styled-components";

import React from "react";
import { motion } from "framer-motion";

const IconWrapper = ({ children }) => {
    return (
        <IconWrapperStyle
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}>
            {children}
        </IconWrapperStyle>
    );
};

const IconWrapperStyle = styled.div`
    width: 3rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5ch;
    cursor: pointer;
    border-radius: 7px;
    ${props => !props.outline && props.theme.gradient({ animationLength: 5 })}
`;

export default IconWrapper;
