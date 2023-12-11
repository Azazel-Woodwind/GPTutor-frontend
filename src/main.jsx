import ReactDOM from "react-dom/client";
import Router from "./Router";
import { SessionContextProvider } from "./context/SessionContext";
import { ThemeProvider } from "styled-components";
import Theme from "@/styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";
import { NotificationContextProvider } from "./context/NotificationContext";
import { AppDataContextProvider } from "./context/AppDataContext";
import { HeaderContextProvider } from "./context/HeaderContext";
import Ellipse1 from "./components/application/BlurredEllipses/Ellipse1";
import Ellipse2 from "./components/application/BlurredEllipses/Ellipse2";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <NotificationContextProvider>
            <SessionContextProvider>
                <AppDataContextProvider>
                    <HeaderContextProvider>
                        <Router />
                    </HeaderContextProvider>
                    <Ellipse1 />
                    <Ellipse2 />
                </AppDataContextProvider>
            </SessionContextProvider>
        </NotificationContextProvider>
    </ThemeProvider>
);
