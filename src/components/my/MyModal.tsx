import { Box, Modal, ModalProps, styled } from "@mui/material";

const StyledModal = styled(Modal)<ModalProps>({
    display: "flex",
    justifyContent: "center",
});

type MyModalPropsType = {
    top?: number;
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
    top = 10,
    xs = 80,
    sm = 70,
    md = 45,
    lg = 35,
    xl = 30,
}: MyModalPropsType) => (
    <StyledModal open={open} onClose={onClose} sx={{ overflow: "scroll" }}>
        <Box
            sx={{
                color: "text.primary",
                bgcolor: "background.paper",
                position: "absolute" as "absolute",
                top: `${top}%`,
                width: { xs: `${xs}%`, sm: `${sm}%`, md: `${md}%`, lg: `${lg}%`, xl: `${xl}%` },
                boxShadow: 24,
                p: 2,
            }}
            borderRadius={5}
        >
            {children}
        </Box>
    </StyledModal>
);
export default MyModal;
