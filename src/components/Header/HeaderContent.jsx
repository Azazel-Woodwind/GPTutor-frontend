import React from "react";
import styled from "styled-components";
import { NavigateHome } from "../Navigation";
import CustomButton from "../Button";
import ProgressBar from "../ProgressBar";
import { Exit } from "@styled-icons/boxicons-regular/Exit";
import { TextWrapper } from "../../styles/TextWrappers";
import SvgIcon from "../SvgIcon";
import { ExitSvgData } from "../../lib/svgIconData";

const HeaderContent = ({ centerContent, rightContent }) => {
    return (
        <>
            <Center>{centerContent}</Center>
            <Right>{rightContent}</Right>
        </>
    );
};

const Center = styled.div`
    position: absolute;
    left: 50%;
    top: 38px;
    transform: translateX(-50%);
`;

const Right = styled.div`
    position: absolute;
    top: 1.6em;
    right: 4em;
    z-index: 1000;
`;

export default HeaderContent;
