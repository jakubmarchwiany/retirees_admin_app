import { Box, Stack } from "@mui/material";
import "assets/app.css";
import NewPost from "components/admin/NewPost";
import Home from "components/main/Home";
import NotFound from "components/main/NotFound";
import { useAppDispatch } from "hooks/redux";
import Cookies from "js-cookie";
import Footer from "layouts/Footer";
import LoadingPage from "layouts/LoadingPage";
import Navbar from "layouts/Navbar";
import Notification from "layouts/Notification";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { autoLogin } from "store/auth-actions";

const { DEV } = import.meta.env;

function App() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (Cookies.get("Authorization") !== undefined) {
            dispatch(autoLogin(setIsLoading));
        } else {
            // if (!DEV) window.location.href = window.location.origin;
        }
    }, []);

    return isLoading ? (
        <LoadingPage />
    ) : (
        <Stack height='100vh' display='flex' flexDirection='column' className='background'>
            <Navbar />
            <Box
                component={"main"}
                id='scroller'
                flex={1}
                overflow='auto'
                color='primary.contrastText'
            >
                <Routes>
                    <Route key='/admin' path='admin'>
                        <Route key='' path='' element={<Navigate to='/admin/home' replace />} />
                        <Route key='/home' path='home' element={<Home />} />,
                        <Route key='/new-post' path='new-post' element={<NewPost />} />,
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Box>
            <Notification />
            <Footer />
        </Stack>
    );
}
export default App;
