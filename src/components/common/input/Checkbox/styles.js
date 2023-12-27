import styled from "styled-components";

export const SvgCheckbox = styled.svg`
    width: 100%;
    height: 100%;
`;

export const Container = styled(motion.div)`
    ${props => props.theme.utils.centeredRow}
    position: relative;
    cursor: pointer;
    gap: 0.4rem;
    /* border: 1px solid black; */
    width: fit-content;
`;

export const CheckboxContainer = styled.div`
    position: relative;
    width: ${props => (props.size ? props.size : 20)}px;
    height: ${props => (props.size ? props.size : 20)}px;
    /* border: 1px solid black; */
`;

export const CheckboxInput = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    cursor: pointer;
`;

export const CheckIconWrapper = styled.div`
    width: 95%;
    height: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    /* border: 2px solid black; */
`;

export const SvgCheckIcon = styled.svg`
    width: ${props => props.checkboxSize - 2 * props.borderWidth}px;
    height: ${props => props.checkboxSize - 2 * props.borderWidth}px;
    /* width: 5rem;
    height: 5rem; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -52%);
    /* border: 2px solid black; */
`;

export const CheckboxText = styled(TextWrapper)`
    ::after {
        display: block;
        content: attr(content);
        font-weight: 500;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
`;
