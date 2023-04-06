import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body, html {
        z-index: -1;
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
        
        color: ${props => props.theme.colours.primary};;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        overflow-x: clip;
        background-color: #121a3f;
        overflow-y: clip;
        ${props => props.theme.utils.fullScreen};
    }

    #root {
        ${props => props.theme.utils.fullScreen};
    }

    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box; //DICKhead caught in 4k
    }
*::-webkit-scrollbar {
  width: 0.3em;
}
 
*::-webkit-scrollbar-track {
  background-color: ${props => props.theme.colours.tertiary};
}
 
*::-webkit-scrollbar-thumb {
  ${props => props.theme.gradient({ animationLength: 5 })}
  border-radius: 10px;
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
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }
`;

export default GlobalStyles;
