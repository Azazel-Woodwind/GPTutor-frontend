import XAvatar from "@/components/application/XAvatar";
import Button from "@/components/common/input/Button/Button";
import CenteredColumn from "@/components/common/layout/CenteredColumn";
import CenteredRow from "@/components/common/layout/CenteredRow";
import React from "react";

function X() {
    const [emotion, setEmotion] = React.useState("neutral");
    const [numRings, setNumRings] = React.useState(1);
    const [variant, setVariant] = React.useState("slow");
    const [glow, setGlow] = React.useState(false);
    const [state, setState] = React.useState(true);

    return (
        <CenteredColumn fillparent>
            <XAvatar
                size={150}
                newEmotion={emotion}
                numRings={3}
                glow={glow}
                appear
            />
            <CenteredRow gap="1rem">
                <Button
                    onClick={async () => {
                        setEmotion("excited");
                        setTimeout(() => {
                            setEmotion("neutral");
                        }, 4000);
                    }}>
                    Excited
                </Button>
                <Button
                    onClick={async () => {
                        setEmotion("happy");
                        setTimeout(() => {
                            setEmotion("neutral");
                        }, 4000);
                    }}>
                    Happy
                </Button>
                <Button
                    onClick={async () => {
                        setState(prev => !prev);
                    }}>
                    Toggle
                </Button>
            </CenteredRow>
        </CenteredColumn>
    );
}

export default X;
