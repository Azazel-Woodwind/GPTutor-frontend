import React from "react";
import CustomButton from "../Button";
import { TextWrapper } from "../../styles/TextWrappers";
import SvgIcon from "../SvgIcon";
import { ExitSvgData } from "../../lib/svgIconData";

function ExitButton({ outline, onClick }) {
    return (
        <CustomButton outline={outline} onClick={onClick}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2em",
                }}>
                <TextWrapper
                    mainGradient={outline}
                    fontWeight={600}
                    fontSize="20px">
                    Exit
                </TextWrapper>
                <SvgIcon
                    svgData={ExitSvgData}
                    fill={!outline ? "white" : "gradient"}
                    size="2em"
                />
            </div>
        </CustomButton>
    );
}

export default ExitButton;
