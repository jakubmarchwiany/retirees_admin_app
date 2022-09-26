import { ToggleButtonGroup, ToggleButtonProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const MyToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonProps>(({ theme }) => ({
    "& .MuiToggleButton-root.Mui-selected": {
        color: theme.palette.secondary.main,
        backgroundColor: alpha(theme.palette.primary.main, 1),
    },
}));

export default MyToggleButtonGroup;
