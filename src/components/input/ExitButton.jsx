import React from "react";
import Button from "./Button";
import { TextWrapper } from "../../styles/TextWrappers";
import SvgIcon from "../SvgIcon";
import { ExitSvgData } from "../../lib/svgIconData";

function ExitButton({ outline, onClick }) {
    return (
        <Button outline={outline} onClick={onClick}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                }}>
                <TextWrapper
                    mainGradient={outline}
                    fontWeight={600}
                    fontSize="1.25rem">
                    Exit
                </TextWrapper>
                <SvgIcon
                    svgData={ExitSvgData}
                    fill={!outline ? "white" : "gradient"}
                    size="2rem"
                />
            </div>
        </Button>
    );
}

export default ExitButton;
