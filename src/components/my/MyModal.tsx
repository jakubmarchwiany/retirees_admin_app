import { Box, Modal, ModalProps, styled } from "@mui/material";

const StyledModal = styled(Modal)<ModalProps>({
    display: "flex",
    justifyContent: "center",
});

type MyModalPropsType = {
    top?: number;
    p?: number;
    borderRadius?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
} & ModalProps;

const MyModal = ({
    open,
    onClose,
    children,
    top = 1,
    p = 0,
    borderRadius = 0,
}: // xs = 80,
// sm = 70,
// md = 45,
// lg = 35,
// xl = 30,
MyModalPropsType) => (
    <StyledModal open={open} onClose={onClose} sx={{ overflow: "scroll" }}>
        <Box
            sx={{
                color: "text.primary",
                bgcolor: "background.paper",
                position: "absolute" as "absolute",
                maxWidth: "80vw",
                top: `${top}%`,
                p: { p },
            }}
            borderRadius={borderRadius}
        >
            {children}
        </Box>
    </StyledModal>
);
export default MyModal;
