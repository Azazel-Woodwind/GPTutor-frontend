import React from "react";
import Button from "@/components/common/input/Button";

const SPEEDS = [1, 1.5, 2];

function SpeedChangerButton({ speed = 1, setSpeed }) {
    const incrementSpeed = () => {
        setSpeed(prev => SPEEDS[(SPEEDS.indexOf(prev) + 1) % SPEEDS.length]);
    };

    return (
        <Button outline onClick={incrementSpeed} paddingX={1}>
            {speed}x
        </Button>
    );
}

export default SpeedChangerButton;
