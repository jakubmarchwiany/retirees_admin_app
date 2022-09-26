import { Icon, IconProps, styled } from "@mui/material";

interface ExpandMoreProps extends IconProps {
    expand: boolean;
}

export const ExpandMoreIcon = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <Icon {...other} />;
})(({ theme, expand }) => ({
    color: theme.palette.primary.main,
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
