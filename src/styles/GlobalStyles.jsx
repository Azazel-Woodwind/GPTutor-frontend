import { createGlobalStyle } from "styled-components";
import { gradientColour1 } from "./Theme";
import { HTML_FONT_SIZE_IN_PX } from "../lib/measurements";

const GlobalStyles = createGlobalStyle`

    body, html {
        font-size: ${HTML_FONT_SIZE_IN_PX}px;
        position: relative;
        z-index: -3;
        height: 100%;
        color: ${props => props.theme.colours.primary};
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
        overflow-x: clip;
        background-color: ${props => props.theme.colours.background};
        /* background: linear-gradient(
            125deg,
            #18203C,
            #00438D
        ); */
        /* background: radial-gradient(
            #18203C 0%,
            #00438D 100%
        ); */
        overflow-y: clip;
    }

    #root {
        height: 100%;
        width: 100%;
    }

    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box; 
        margin: 0;
        padding: 0;
        p, h1, h2, h3, h4, h5 {
            margin: default;
            padding: default; 
        }
        scrollbar-width: thin;
        scrollbar-color: ${gradientColour1} ${props =>
    props.theme.colours.tertiary};
        
        /* color: white;
        background-color: white; */
    }

    *::-webkit-scrollbar {
        width: 8px;
        height: 0.625rem;
        cursor: pointer;
    }
    
    *::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colours.tertiary};
        cursor: pointer;
    }
    
    *::-webkit-scrollbar-thumb {
        /* background-color: ${props => props.theme.colours.contrast}; */
        ${props => props.theme.gradient()}

        border-radius: 0.625rem;
    }

    *::-webkit-scrollbar-thumb:hover {
        ${props => props.theme.gradient({ opacity: 0.75 })}
    }

    *::-webkit-scrollbar-thumb:active {
        ${props => props.theme.gradient({ opacity: 0.55 })}
    }


    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 2px rgb(52, 65, 97, 1);
            background-color: rgb(255,255,255,0.1);
            transform: scale(0.4);
            opacity: 0;
        }
        
        50% {
            box-shadow: 0 0 0 1px rgba(52, 65, 97, 0.8);
            background-color: rgb(255,255,255,0.05);
            opacity: 1;
        }
        
        85% {
            box-shadow: 0 0 0 1px rgba(52, 65, 97, 0.1);
            background-color: rgb(255,255,255,0.025);
        }
        
        100% {
            box-shadow: 0 0 0 1px rgba(52, 65, 97, 0.05);
            transform: scale(3);
        }
    }

    @keyframes gradient {
        from {
            background-position: 0 100%;
        }
        to {
            background-position: 100% 0;
        }
    }
`;

export const AlternateGlobalStyle = createGlobalStyle`
    body, html {
        background-color: ${props => props.theme.colours.tertiary};
    }
`;

export default GlobalStyles;
