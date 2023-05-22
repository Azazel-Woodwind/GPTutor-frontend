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
    const checkbox = React.useRef(null);
    const form = useForm();
    const sendNotification = useNotification();

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

    const [imageLink, setImageLink] = React.useState("");
    const [validImageLink, setValidImageLink] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");

    React.useEffect(() => {
        // supabase.auth.onAuthStateChange(async (event, session) => {
        //     console.log(event);
        //     if (event == "PASSWORD_RECOVERY") {
        //         console.log("HERE");
        //         // const newPassword = prompt("What would you like your new password to be?");
        //         // const { data, error } = await supabase.auth
        //         //   .updateUser({ password: "newpassword" })
        //         // if (data) alert("Password updated successfully!")
        //         // if (error) alert("There was an error updating your password.")
        //     }
        // });
    }, []);

    return (
        <CenteredColumn fillparent gap="10px" style={{ overflow: "auto" }}>
            <CustomButton onClick={() => PublishModal.handleOpen()}>
                Click to open publish modal
            </CustomButton>
            <CustomButton onClick={() => InvalidModal.handleOpen()}>
                Click to open invalid lesson modal
            </CustomButton>
            <CustomButton onClick={() => UnpublishModal.handleOpen()}>
                Click to open unpublish modal
            </CustomButton>
            <CustomButton onClick={() => DeleteModal.handleOpen()}>
                Click to open delete modal
            </CustomButton>
            <CustomButton
                onClick={() =>
                    sendNotification({
                        label: "Lesson successfully created and published!",
                        duration: 5,
                        type: "success",
                    })
                }>
                Click to see notification
            </CustomButton>

            <PublishModalComponent {...PublishModal.ModalProps} type="dropIn">
                <PublishLessonModal
                    lesson={{ title: "Fundamentals of Algebra" }}
                    handleClose={PublishModal.handleClose}
                />
            </PublishModalComponent>

            <InvalidModalComponent {...InvalidModal.ModalProps} type="dropIn">
                <InvalidLessonModal handleClose={InvalidModal.handleClose} />
            </InvalidModalComponent>

            <UnpublishModalComponent
                {...UnpublishModal.ModalProps}
                type="dropIn">
                <UnpublishLessonModal
                    lesson={{ title: "Fundamentals of Algebra" }}
                    handleClose={UnpublishModal.handleClose}
                />
            </UnpublishModalComponent>

            <DeleteModalComponent {...DeleteModal.ModalProps} type="dropIn">
                <DeleteLessonModal
                    lesson={{ title: "Fundamentals of Algebra" }}
                    handleClose={DeleteModal.handleClose}
                />
            </DeleteModalComponent>

            <Textfield
                label="Image Link"
                fullwidth
                value={imageLink}
                onChange={e => setImageLink(e.target.value)}
            />
            <CustomButton
                onClick={() => {
                    setValidImageLink(formatImageSource(imageLink));
                }}>
                Click to validate image link
            </CustomButton>

            {validImageLink && (
                <img src={validImageLink} alt="image" width="400px" />
            )}

            <CustomButton
                onClick={async () => {
                    try {
                        const { data, error } = await supabase.auth.updateUser({
                            password: "password",
                        });

                        if (error) {
                            throw error;
                        }

                        console.log(data);
                    } catch (error) {
                        console.log(error);
                    }
                }}>
                Click to change password
            </CustomButton>
            <CustomButton
                onClick={async () => {
                    const { data, error } =
                        await supabase.auth.resetPasswordForEmail(
                            "azazelwoodwind11@gmail.com",
                            {
                                redirectTo:
                                    "http://localhost:5173/reset-password",
                            }
                        );

                    console.log(data, error);
                }}>
                Click to send password link
            </CustomButton>
            <CustomButton outline>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2em",
                    }}>
                    <TextWrapper mainGradient fontWeight={600} fontSize="lg">
                        Exit Lesson
                    </TextWrapper>
                    <SvgIcon svgData={ExitSvgData} fill="gradient" size="2em" />
                </div>
            </CustomButton>
            <StatusChip status={"Verified"} />
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
