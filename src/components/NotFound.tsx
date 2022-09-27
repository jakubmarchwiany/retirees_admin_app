import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <Box mt={15} textAlign='center'>
            <Typography variant='h4'>Ta strona jest niedostępna</Typography>
            <Typography mt={10} mb={5} variant='h5'>
                Link może być uszkodzony lub strona mogła zostać usunięta.
                <br /> Sprawdź, czy link, który próbujesz otworzyć, jest poprawny.
            </Typography>
            <Button component={Link} variant='contained' to={"/"}>
                Wróć
            </Button>
        </Box>
    );
}
export default NotFound;
