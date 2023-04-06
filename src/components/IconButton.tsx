import styled from "styled-components";

const IconButtonStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.7em;
    width: 2.4em;
    height: 2.4em;
    border-radius: 50%;
    z-index: 20;
    cursor: pointer;
    color: ${props => props.theme.colours.primaryStrong};

    background-image: linear-gradient(#ffffff20, #ffffff20);
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 0% 0%;
    transition: background-size 0.5s ease-in-out;

    :hover {
        background-size: 100% 100%;
    }
`;

export default function IconButton({ children, className, ...props }) {
    return (
        <IconButtonStyle className={className} {...props}>
            {children}
        </IconButtonStyle>
    );
}
