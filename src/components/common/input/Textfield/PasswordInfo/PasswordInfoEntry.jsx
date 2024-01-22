import styled, { useTheme } from "styled-components";
import { CheckSvgData, CrossSvgData } from "@/lib/svgIconData";
import TextWrapper from "@/components/utils/TextWrapper";
import SVGIcon from "@/components/common/graphics/SVGIcon";

const PasswordInfoEntryContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const PasswordInfoEntryIcon = styled.div`
    width: 1.875em;
    height: 1.875em;
    /* border: 2px solid black; */
`;

function PasswordInfoEntry({ correct, text }) {
    const theme = useTheme();

    return (
        <PasswordInfoEntryContainer>
            <PasswordInfoEntryIcon>
                <SVGIcon
                    svgData={correct ? CheckSvgData : CrossSvgData}
                    fill={correct ? "gradient" : `${theme.colours.error}`}
                    size="100%"
                />
            </PasswordInfoEntryIcon>
            <TextWrapper
                mainGradient={correct}
                color={!correct ? theme.colours.error : undefined}>
                {text}
            </TextWrapper>
        </PasswordInfoEntryContainer>
    );
}

export default PasswordInfoEntry;
