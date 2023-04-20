import useAvatar from "../hooks/useAvatar";
import CenteredColumn from "../styles/containers/CenteredColumn";
import { Cross } from "@styled-icons/entypo/Cross";
import { Send } from "@styled-icons/material/Send";
import { CrossSvgData, SendSvgData, MicSvgData } from "../lib/svgIconData";
import IconButton from "../components/IconButton";
import { Microphone } from "@styled-icons/fa-solid/Microphone";
import ProgressBar from "../components/ProgressBar";
import Notification from "../components/Notification";
import styled from "styled-components";
function Test() {
    console.log("Sup");
    return (
        <Container fillparent>
            <Notification />
        </Container>
    );
}

const Container = styled(CenteredColumn)`
    background-color: ${props => props.theme.colours.tertiary};
    width: 100vw;
    height: 100vh;
`;
export default Test;
