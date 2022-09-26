import { Button, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { NavLink, NavLinkProps } from "react-router-dom";

type Props = {
    to?: string;
    text: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    isActive: boolean;
    closeMenu?: () => void;
} & NavLinkProps;

const activeStyle = {
    textDecoration: "none",
    fontWeight: "bold",
    display: "none",
};

const noActiveStyle = {
    textDecoration: "none",
};

function MyLinkButton({ isActive, to, text, Icon, closeMenu }: Props) {
    return (
        <NavLink to={to} onClick={closeMenu} style={isActive ? activeStyle : noActiveStyle}>
            <Button
                size='large'
                startIcon={<Icon fontSize='large' />}
                onClick={closeMenu}
                fullWidth
                sx={{ fontWeight: "inherit", color: "primary" }}
            >
                {text}
            </Button>
        </NavLink>
    );
}

export default MyLinkButton;
