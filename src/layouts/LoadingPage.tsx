import { CircularProgress, Stack } from "@mui/material";

function LoadingPage() {
    return (
        <div
            style={{
                backgroundColor: "#424242",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Stack justifyContent={"center"}>
                <CircularProgress size={100} />
            </Stack>
        </div>
    );
}

export default LoadingPage;
