import { Box, Stack } from "@mui/material";
import "assets/app.css";
import Home from "components/Home";
import NewPost from "components/NewPost";
import NotFound from "components/NotFound";
import { useAppDispatch } from "hooks/redux";
import Cookies from "js-cookie";
import Footer from "layouts/Footer";
import LoadingPage from "layouts/LoadingPage";
import Navbar from "layouts/Navbar";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { autoLogin } from "store/auth-actions";
import { authorizationFail } from "utils/fetches";

function App() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (Cookies.get("Authorization") !== undefined) {
            dispatch(autoLogin(setIsLoading));
        } else {
            authorizationFail();
        }
    }, []);

    return isLoading ? (
        <LoadingPage />
    ) : (
        <Stack height="100vh" display="flex" flexDirection="column" className="background">
            <Navbar />
            <Box
                component={"main"}
                id="scroller"
                flex={1}
                overflow="auto"
                color="primary.contrastText"
                py={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            >
                <Routes>
                    <Route key="/admin" path="admin">
                        <Route key="" path="" element={<Navigate to="/admin/home" replace />} />
                        <Route key="/home" path="home" element={<Home />} />,
                        <Route key="/new-post" path="new-post" element={<NewPost />} />,
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
            <Footer />
            <Toaster
                position="bottom-center"
                gutter={10}
                containerStyle={{ marginBottom: "40px" }}
            />
        </Stack>
    );
}
export default App;
