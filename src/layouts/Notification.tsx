import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { useAppSelector } from "hooks/redux";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "store/ui-slice";

type TransitionProps = Omit<SlideProps, "direction">;
function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction='right' mountOnEnter unmountOnExit />;
}

function Notification() {
    const dispatch = useDispatch();
    const notify = useAppSelector((state) => state.ui);

    const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return;

        dispatch(uiActions.hideNotification());
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            sx={{ mb: 4 }}
            open={notify.open}
            autoHideDuration={notify.duration}
            onClose={handleClose}
            TransitionComponent={TransitionLeft}
            transitionDuration={notify.open ? 600 : 300}
        >
            <Alert onClose={handleClose} severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
    );
}
export default memo(Notification);
