import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export interface Props {
    title?: string;
    content: string;
    open: boolean;
    isDelete?: boolean;
    onClose: (decision: boolean) => void;
}
function DialogConfirm(props: Props) {
    const { onClose, open, title, content, isDelete = false, ...other } = props;

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog
            sx={{
                "& .MuiDialog-paper": {
                    width: { xs: "90%", sm: "50%", md: "40%", lg: "30%", xl: "25%" },
                },
            }}
            open={open}
            {...other}
        >
            <DialogTitle variant="h6">
                {title !== undefined ? title : "Czy na pewno chcesz to zrobić?"}
            </DialogTitle>
            <DialogContent dividers>{content}</DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" fullWidth onClick={handleCancel}>
                    Anuluj
                </Button>
                <Button
                    variant="contained"
                    color={isDelete ? "error" : "success"}
                    fullWidth
                    onClick={handleOk}
                    autoFocus
                >
                    {isDelete ? "Usuń" : "Potwierdzam"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogConfirm;
