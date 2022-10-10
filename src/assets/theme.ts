import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {
            main: "#133478",
            contrastText: "#fff",
        },
        secondary: {
            main: "#fff",
            contrastText: "#133478",
        },
        background: {
            default: "#fff",
            paper: "#fff",
        },
        divider: "#D3D3D3",
    },
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 769,
            md: 1024,
            lg: 1216,
            xl: 1408,
        },
    },
});

theme = responsiveFontSizes(theme);

export { theme };
