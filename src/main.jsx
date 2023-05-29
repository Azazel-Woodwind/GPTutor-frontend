import ReactDOM from "react-dom/client";
import Router from "./Router";
import { SessionContextProvider } from "./context/SessionContext";
import { Ellipse1, Ellipse2 } from "./styles/Ellipses";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";
import PageWrapper from "./styles/containers/PageWrapper";
import { NotificationContextProvider } from "./context/NotificationContext";
import { AppDataContextProvider } from "./context/AppDataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <NotificationContextProvider>
            <SessionContextProvider>
                <AppDataContextProvider>
                    <Router />
                    {/* <Ellipse1 />
                    <Ellipse2 /> */}
                </AppDataContextProvider>
            </SessionContextProvider>
        </NotificationContextProvider>
    </ThemeProvider>
);
