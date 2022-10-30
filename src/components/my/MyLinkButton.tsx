import { Button, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Link } from "react-router-dom";

type Props = {
    text: string;
    to: string;
    isActive?: boolean;
    size?: "small" | "medium" | "large";
    textColor?: string;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    fullWidth?: boolean;
    closeMenu?: () => void;
};

function MyLinkButton({
    text,
    to,
    isActive = false,
    size = "large",
    textColor = "secondary.contrastText",
    Icon,
    fullWidth = true,
    closeMenu,
}: Props) {
    return (
        <Link to={to} style={{ textDecoration: "none" }}>
            <Button
                size={size}
                startIcon={Icon && <Icon />}
                disabled={isActive}
                sx={{ color: textColor }}
                fullWidth={fullWidth}
                onClick={closeMenu}
            >
                {text}
            </Button>
        </Link>
    );
}

export default MyLinkButton;
