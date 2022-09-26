import { ThemeProvider } from "@mui/material/styles";
import { theme } from "assets/theme";
import { StrictMode } from "react";
import App from "./App";
import validateEnv from "./utils/validate-env";

validateEnv();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
                            <App />
        </ThemeProvider>
    </StrictMode>,
);
