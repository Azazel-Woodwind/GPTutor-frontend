import ReactDOM from "react-dom/client";
import Router from "./Router";
import { SessionContextProvider } from "./context/SessionContext";
import PageWrapper, { Ellipse1, Ellipse2 } from "./styles/PageWrapper";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";

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
