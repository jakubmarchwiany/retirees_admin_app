import { Home, Logout, PostAdd, Refresh } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import MyLinkButton from "components/my/MyLinkButton";
import { useAppDispatch } from "hooks/redux";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { appActions } from "store/app-slice";

const { DEV } = import.meta.env;

interface NavigatorProps {
    menu: boolean;
    closeMenu?: () => void;
}

const Navigator = ({ menu, closeMenu }: NavigatorProps) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const logoutHandler = () => {
        Cookies.remove("Authorization");

        if (!DEV) window.location.href = window.location.origin;
    };

    const refreshHandler = () => {
        dispatch(appActions.setLoading(true));
    };

    return (
        <Stack direction={menu ? "column" : "row"}>
            <MyLinkButton
                isActive={location.pathname === "/admin/home"}
                to='/admin/'
                closeMenu={closeMenu}
                text='Strona główna'
                Icon={Home}
            />
            {location.pathname === "/admin/home" && (
                <>
                    <Button
                        size='large'
                        startIcon={<Refresh fontSize='large' />}
                        onClick={refreshHandler}
                        sx={{ fontWeight: "inherit", color: "primary" }}
                    >
                        Odśwież
                    </Button>
                </>
            )}
            <MyLinkButton
                isActive={location.pathname === "/admin/new-post"}
                to='/admin/new-post'
                closeMenu={closeMenu}
                text='Nowy Post'
                Icon={PostAdd}
            />
            <Button
                size='large'
                startIcon={<Logout fontSize='large' />}
                onClick={logoutHandler}
                sx={{ fontWeight: "inherit", color: "primary" }}
            >
                Wyloguj
            </Button>
        </Stack>
    );
};
export default Navigator;
