import { FONT_SIZE_MAPPINGS } from "@/lib/constants";
import { css } from "styled-components";

export const BaseButtonStyles = css`
    font-size: ${props => FONT_SIZE_MAPPINGS[props.size || "md"]};
    padding: 0.8em 2em;
`;
