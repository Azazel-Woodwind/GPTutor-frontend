import React from "react";
import Gallery from "../components/Gallery";
import Textfield from "../components/Textfield";
import CenteredColumn from "../styles/containers/CenteredColumn";

const imagesA = [
    "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];

function Test1() {
    return (
        <CenteredColumn fillparent>
            <Gallery images={imagesA} />
        </CenteredColumn>
    );
}

export default Test1;
