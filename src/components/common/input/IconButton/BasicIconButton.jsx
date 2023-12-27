import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const IconButtonStyle = styled(motion.div)`
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 20;

    color: ${props => props.theme.colours.primaryStrong};

    ${props =>
        !props.disabled &&
        css`
            cursor: pointer;
            ::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                scale: 0;
                border-radius: 50%;
                background-color: #ffffff20;
                transition: scale 0.5s ease;
            }

            :hover::after,
            :focus::after {
                scale: 1;
            }

            :active::after {
                scale: 1;
            }

            :hover,
            :focus {
                outline: none;
            }
        `}
`;

function BasicIconButton(props) {
    return (
        <IconButtonStyle
            tabIndex={0}
            onMouseDown={e => e.preventDefault()}
            onMouseOver={e => e.currentTarget.blur()}
            {...props}>
            {props.children}
        </IconButtonStyle>
    );
}

export default BasicIconButton;
