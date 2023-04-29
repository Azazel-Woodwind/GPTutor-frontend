import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import CustomButton from "../components/Button";
import Gallery from "../components/Gallery";
import Textfield from "../components/Textfield";
import CenteredColumn from "../styles/containers/CenteredColumn";
import { fade_animation } from "../styles/FramerAnimations";
import SvgLinearGradient from "../components/SvgLinearGradient";
import useDropdownList from "../hooks/useDropdownList";
import { useNotification } from "../context/NotificationContext";
import { ErrorCircle } from "@styled-icons/fluentui-system-filled/ErrorCircle";

const imagesA = [
    "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];

const props = {
    initial: "hidden",
    animate: "visible",
};
function Test1() {
    const sendNotification = useNotification();

    const {
        selected,
        Component: DropdownList,
        props: dropdownProps,
    } = useDropdownList({
        label: "Select a color",
        options: ["Red", "Orange", "Yellow", "Green", "Blue"],
        required: true,
    });

    return (
        <CenteredColumn fillparent gap="1em">
            <DropdownList {...dropdownProps} />
            <CustomButton
                onClick={() =>
                    sendNotification({
                        label: "Please fill in all fields",
                        duration: 5,
                        type: "error",
                    })
                }>
                Click me for error notification
            </CustomButton>
            <CustomButton
                onClick={() =>
                    sendNotification({
                        label: "Please fill in all fields",
                        duration: 5,
                        type: "info",
                    })
                }>
                Click me for info notification
            </CustomButton>
            <CustomButton
                onClick={() =>
                    sendNotification({
                        label: "Please fill in all fields",
                        duration: 5,
                        type: "success",
                    })
                }>
                Click me for success notification
            </CustomButton>
            {/* <ErrorCircle /> */}
        </CenteredColumn>
    );
}

const Container = styled(motion.div)`
    width: 300px;
    height: 300px;
    ${props => props.theme.gradient({ animationLength: 5 })}
`;

export default Test1;
