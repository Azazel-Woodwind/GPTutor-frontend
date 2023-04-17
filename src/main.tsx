import ReactDOM from "react-dom/client";
import Router from "./Router";
import { SessionContextProvider } from "./context/SessionContext";
import { Ellipse1, Ellipse2 } from "./styles/Ellipses";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageWrapper from "./styles/containers/PageWrapper";
// import {} from "styled-components/cssprop";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ThemeProvider theme={Theme}>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastStyle={{ fontSize: "20px" }}
        />
        <GlobalStyles />
        <SessionContextProvider>
            <Router />
            <Ellipse1 />
            <Ellipse2 />
        </SessionContextProvider>
    </ThemeProvider>
);
