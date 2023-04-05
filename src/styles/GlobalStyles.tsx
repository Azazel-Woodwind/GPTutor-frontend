import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
        color: ${props => props.theme.colours.primary};;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        overflow-x: clip;
        background-color: ${props => props.theme.colours.tertiary};
        ${props => props.theme.utils.fullScreen};
    }

    #root {
        ${props => props.theme.utils.fullScreen};
    }

    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 2px rgb(52, 65, 97, 1);
            background-color: rgb(255,255,255,0.1);
            transform: scale(0);
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
`;

export default GlobalStyles;
