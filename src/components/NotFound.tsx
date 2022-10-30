import { Dashboard } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import MyLinkButton from "components/my/MyLinkButton";

function NotFound() {
    return (
        <Container
            component="main"
            sx={{
                px: { xs: 1, sm: 10, md: 5, lg: 15, xl: 20 },
            }}
        >
            <Box textAlign="center" mt={5}>
                <Typography variant="h3">Ta strona jest niedostępna</Typography>
                <Typography mt={10} mb={5} variant="h5">
                    Link może być uszkodzony lub strona mogła zostać usunięta.
                    <br /> Sprawdź, czy link, który próbujesz otworzyć, jest poprawny.
                </Typography>

                <MyLinkButton
                    text="Powrót do Panelu głównego"
                    to="admin/home"
                    isActive={false}
                    size="large"
                    Icon={Dashboard}
                />
            </Box>
        </Container>
    );
}
export default NotFound;
