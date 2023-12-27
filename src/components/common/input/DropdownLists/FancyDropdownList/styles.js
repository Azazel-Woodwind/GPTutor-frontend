import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const OPTION_HEIGHT_IN_REM = 2.5;
const PADDING_IN_REM = 0.6;
const MAX_OPTION_CONTAINER_HEIGHT_IN_REM =
    OPTION_HEIGHT_IN_REM * 4 + PADDING_IN_REM * 5;

export const OptionContainer = styled(motion.ul)`
    position: absolute;
    top: calc(100% + ${PADDING_IN_REM}rem);
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    background: #fafafa;
    padding: ${PADDING_IN_REM}rem;

    max-height: ${MAX_OPTION_CONTAINER_HEIGHT_IN_REM}rem;

    overflow-y: auto;

    border-radius: 10px;
    /* border: 5px solid red; */
`;

export const Search = styled.input`
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1.05rem;
    font-weight: 700;
    color: #6600ff;
    width: 100%;
    background: transparent;
    padding: 0.3rem 0;

    ::placeholder {
        color: #6600ff;
        opacity: 0.5;
    }
`;

export const DropdownSearchContainer = styled(motion.div)`
    background: #fafafa;
    color: #6600ff;
    border-radius: 0.6rem;
    padding: 0.6rem 1.2rem;
    font-size: 1.12rem;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.6rem;

    path {
        fill: #6600ff;
    }
`;

export const Option = styled(motion.li)`
    color: #6600ff;
    display: flex;
    align-items: center;

    border-radius: 5px;

    min-height: ${OPTION_HEIGHT_IN_REM}rem;
    font-weight: 600;

    padding-left: ${PADDING_IN_REM}rem;

    ${props =>
        props.disabled
            ? css`
                  color: #888;
              `
            : css`
                  cursor: pointer;
                  ${props => props.focused && "background: #e6e6e6;"}
              `}

    ${props =>
        props.selected &&
        css`
            border: 1px solid #6600ff;
            /* background: rgb(0, 153, 255); */
            /* ${props.theme.gradient({ opacity: 0.5 })} */
        `}
`;

export const Container = styled(motion.nav)`
    position: relative;

    filter: drop-shadow(1px 1px 1px #4700b3);
    width: 18.7rem;
    height: fit-content;

    /* border: 5px solid red; */
    user-select: auto;

    ul,
    li {
        list-style: none;
    }
`;
