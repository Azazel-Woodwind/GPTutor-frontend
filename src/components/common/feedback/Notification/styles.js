import styled from "styled-components";
import { motion } from "framer-motion";
import SVGIcon from "@/svg/SVGIcon";
import { TYPES_TO_COLOUR } from "@/constants/feedback";

export const CrossSvg = styled(SVGIcon)`
    position: absolute;
    top: 0.31rem;
    right: 0.31rem;
    cursor: pointer;
`;

export const LabelContainer = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    /* border: 2px solid green; */
    padding-bottom: 0.15rem;
    font-size: 1.25rem;
    color: white;
    font-weight: 600;
`;

export const InnerContentContainer = styled.div`
    /* border: 2px solid red; */
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const ContentContainer = styled.div`
    margin: 1rem 2rem 0.8rem 0.7rem;
`;

export const ProgressContainer = styled.div`
    width: 100%;
    /* background-color: ${props => props.theme.colours.primaryStrong}; */
`;

export const Container = styled(motion.div)`
    position: relative;
    min-width: 21.9rem;
    /* max-width: 20rem; */
    /* top: 2.5rem;
    right: 2.5rem; */
    cursor: pointer;
    background-color: ${props => TYPES_TO_COLOUR[props.type]};
    ${props => props.type === "success" && props.theme.gradient()};
`;
