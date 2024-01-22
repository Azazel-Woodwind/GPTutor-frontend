import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    ${props => props.width && `width: ${props.width};`};
    ${props => props.fullwidth && `width: 100%;`};
    ${props => props.height && `height: ${props.height};`};
    ${props => props.fullheight && `height: 100%;`}/* width: 25rem; */
`;

export const DropdownListWrapper = styled.div`
    visibility: ${props => (props.open ? "visible" : "hidden")};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    /* border: 5px solid black; */
    border-radius: 8px;
    z-index: 100;
    box-shadow: rgba(76, 72, 72, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    overflow: hidden;
    overflow-y: auto;
    max-height: ${props => (props.open ? "12.5rem" : "0")};
    background-color: ${props => props.theme.colours.secondary};
`;

export const DropdownListOption = styled.div`
    color: ${props =>
        props.disabled
            ? props.theme.colours.priamryFaded
            : props.theme.colours.primary};
    padding: 0.7rem;
    background-color: rgb(39, 46, 95);
    ${props =>
        props.selected
            ? props.theme.gradient({ opacity: props.focused ? 1 : 0.5 })
            : `background-color: rgb(39, 46, 95)`};

    ${props =>
        !props.disabled &&
        `
        cursor: pointer;
            ${
                props.focused
                    ? props.selected
                        ? props.theme.gradient({ animationLength: 5 })
                        : `background-color: ${props.theme.colours.glow};`
                    : props.selected &&
                      props.theme.gradient({ animationLength: 5, opacity: 0.5 })
            }

    `}
`;
