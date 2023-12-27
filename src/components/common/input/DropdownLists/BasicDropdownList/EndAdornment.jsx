import React from "react";
import CenteredRow from "@/components/common/layout/CenteredRow";
import IconButton from "@/components/common/input/IconButton/IconButton";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { ArrowIosUpward } from "@styled-icons/evaicons-solid/ArrowIosUpward";
import { ArrowIosDownward } from "@styled-icons/evaicons-solid/ArrowIosDownward";

function EndAdornment({ mouseEntered, selected, setSelected, open }) {
    return (
        <CenteredRow style={{ paddingRight: "0.7rem" }}>
            <IconButton
                style={{
                    display: selected && mouseEntered ? "flex" : "none",
                }}
                onClick={() => setSelected("")}>
                <CloseOutline size={27} />
            </IconButton>
            <IconButton>
                {open ? (
                    <ArrowIosUpward size={27} />
                ) : (
                    <ArrowIosDownward size={27} />
                )}
            </IconButton>
        </CenteredRow>
    );
}

export default EndAdornment;
