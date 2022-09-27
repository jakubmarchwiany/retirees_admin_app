import { Stack, Typography } from "@mui/material";

function Footer() {
    return (
        <Stack direction='row' sx={{ boxShadow: 10 }}>
            <Typography
                variant='subtitle1'
                my={0.5}
                sx={{
                    color: "white",
                    mx: { xs: 2, sm: 5, md: 8, lg: 11, xl: 14 },
                }}
            >
                Chełmscy emeryci {new Date().getFullYear()}
            </Typography>
        </Stack>
    );
}
export default Footer;
