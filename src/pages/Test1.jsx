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
import RadioButton from "../components/RadioButton";
import ProgressBar from "../components/ProgressBar";

const imagesA = [
    "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];

const props = {
    initial: "hidden",
    animate: "visible",
};

const max = 80000;
const current = 49000;

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

    const [test, setTest] = React.useState([]);

    React.useEffect(() => {
        console.log(test[0]);
    }, [test[0]]);

    // console.log(speed);

    return (
        <CenteredColumn fillparent gap="10px" style={{ overflow: "auto" }}>
            <ProgressBar
                width="500px"
                stops={[
                    {
                        label: "average lesson",
                        location: 2000,
                    },
                    {
                        label: "1/4",
                        location: (max / 4) * 1,
                    },
                    {
                        label: "1/2",
                        location: (max / 4) * 2,
                    },
                    {
                        label: "3/4",
                        location: (max / 4) * 3,
                    },
                    {
                        label: "No more usage",
                        location: max,
                    },
                ]}
                value={current}
                max={max}
            />
        </CenteredColumn>
    );
}

export default Test1;
