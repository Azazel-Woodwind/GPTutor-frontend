import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import CustomButton from "../components/Button";
import Gallery from "../components/Gallery";
import Textfield from "../components/Textfield";
import CenteredColumn from "../styles/containers/CenteredColumn";
import { fade_animation } from "../styles/FramerAnimations";

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
    const [show, setShow] = React.useState(false);

    return (
        <CenteredColumn fillparent>
            <AnimatePresence mode="wait">
                <Test />
            </AnimatePresence>
        </CenteredColumn>
    );
}

const Test = styled.div`
    width: 400px;
    height: 400px;
    ${props => props.theme.gradient({ animationLength: 2 })};
`;

function Test2(props) {
    const [show, setShow] = React.useState(false);

    return (
        <>
            {show ? (
                <Container key="one" {...fade_animation()}>
                    <CustomButton onClick={() => setShow(false)}>
                        BUTTON 1
                    </CustomButton>
                </Container>
            ) : (
                <Container key="two" {...fade_animation()}>
                    <CustomButton onClick={() => setShow(true)}>
                        BUTTON 2
                    </CustomButton>
                </Container>
            )}
        </>
    );
}

const Container = styled(motion.div)``;

export default Test1;
