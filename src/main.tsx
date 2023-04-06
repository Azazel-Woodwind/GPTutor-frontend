import ReactDOM from "react-dom/client";
import Router from "./Router";
import { SessionContextProvider } from "./context/SessionContext";
import { Ellipse1, Ellipse2 } from "./styles/Ellipses";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";
// import {} from "styled-components/cssprop";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <>
        <ThemeProvider theme={Theme}>
            <GlobalStyles />
            <SessionContextProvider>
                <Router />
                <Ellipse1 />
                <Ellipse2 />
            </SessionContextProvider>
        </ThemeProvider>
    </>
);
