import { Stack, Typography } from "@mui/material";

function Footer() {
    return (
        <Stack direction='row' sx={{ boxShadow: 10 }} py={1}>
            <Typography mx={15} sx={{ color: "white" }}>
                Chełmscy emeryci {new Date().getFullYear()}
            </Typography>
        </Stack>
    );
}
export default Footer;
