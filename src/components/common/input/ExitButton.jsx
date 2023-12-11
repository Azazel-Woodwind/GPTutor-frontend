import React from "react";
import Button from "@/components/common/input/Button";
import TextWrapper from "@/components/utils/TextWrapper";
import SVGIcon from "@/components/common/graphics/SVGIcon";
import { ExitSvgData } from "@/lib/SVGIconData";

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
                <SVGIcon
                    svgData={ExitSvgData}
                    fill={!outline ? "white" : "gradient"}
                    size="2rem"
                />
            </div>
        </Button>
    );
}

export default ExitButton;
