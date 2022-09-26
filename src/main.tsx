import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { theme } from "assets/theme";
import "dayjs/locale/pl";
import { StrictMode } from "react";
import App from "./App";
import validateEnv from "./utils/validate-env";

validateEnv();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pl"}>
                            <App />
            </LocalizationProvider>
        </ThemeProvider>
    </StrictMode>,
);
