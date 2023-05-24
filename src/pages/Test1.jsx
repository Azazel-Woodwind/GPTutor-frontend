import {
    AnimatePresence,
    motion,
    useDragControls,
    useMotionValue,
} from "framer-motion";
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
import Checkbox from "../components/Checkbox";
import { useForm } from "react-hook-form";
import useModal from "../hooks/useModal";
import PublishLessonModal from "../components/Dashboard/PublishLessonModal";
import InvalidLessonModal from "../components/Dashboard/InvalidLessonModal";
import UnpublishLessonModal from "../components/Dashboard/UnpublishLessonModal";
import DeleteLessonModal from "../components/Dashboard/DeleteLessonModal";
import { lessonFormSchema } from "../lib/lessonFormSchema";
import { IMAGE_LINK_REGEX, SVG_REGEX } from "../lib/regexes";
import { formatImageSource } from "../lib/stringUtils";
import supabase from "../api/configs/supabase";
import { Exit } from "@styled-icons/boxicons-regular/Exit";
import SvgIcon from "../components/SvgIcon";
import { ExitSvgData } from "../lib/svgIconData";
import { TextWrapper } from "../styles/TextWrappers";
import StatusChip from "../components/Dashboard/StatusChip";
import Slider from "../components/Slider";

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
    const { Modal: PublishModalComponent, ...PublishModal } = useModal({
        initialOpen: false,
    });
    const { Modal: InvalidModalComponent, ...InvalidModal } = useModal({
        initialOpen: false,
    });

    const { Modal: UnpublishModalComponent, ...UnpublishModal } = useModal({
        initialOpen: false,
    });

    const { Modal: DeleteModalComponent, ...DeleteModal } = useModal({
        initialOpen: false,
    });

    const [speed, setSpeed] = React.useState(1);

    // console.log(speed);

    return (
        <CenteredColumn fillparent gap="10px" style={{ overflow: "auto" }}>
            <Slider
                min={0.5}
                max={3}
                step={0.1}
                marks={[
                    { value: 0.5, label: "0.5x" },
                    { value: 1, label: "1x" },
                    { value: 1.5, label: "1.5x" },
                    { value: 2, label: "2x" },
                    { value: 2.5, label: "2.5x" },
                    { value: 3, label: "3x" },
                ]}
                value={speed}
                onChange={value => setSpeed(value)}
                onMouseOver={() => console.log("mouse over")}
            />
        </CenteredColumn>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-color: blue;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div``;

const HeaderContent = styled.div`
    height: 150px;
    background-color: red;
`;

const Main = styled.div`
    flex-grow: 1;
    background-color: green;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const SubContent1 = styled.div`
    height: 400px;
    background-color: green;
`;

const MainContent1 = styled.div`
    width: 100%;
    flex: 1;
    background-color: yellow;
    border: 5px solid blue;
`;

const MainContent2 = styled.div`
    width: 100%;
    height: 100vh;
    background-color: yellow;
    border: 5px solid blue;
`;

export default Test1;
