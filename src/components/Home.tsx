import { Fab, Pagination, Skeleton, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import DialogConfirm from "components/my/DialogConfirm";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { PostType } from "store/app-slice";
import { deleteInformation, deleteTrip, getPosts } from "store/post-actions";
import Post from "./Post";

function Home() {
    const [openDialog, setOpenDialog] = useState(false);
    const [post, setPost] = useState<PostType>();
    const [page, setPage] = useState(1);

    const dispatch = useAppDispatch();
    const isLoaded = useAppSelector((state) => state.app.isLoaded);
    const refresh = useAppSelector((state) => state.app.refresh);
    const numberOfPages = useAppSelector((state) => state.app.numberOfPages);
    const posts = useAppSelector((state) => state.app.posts);

    const handleDelete = (post: PostType) => {
        setPost(post);
        setOpenDialog(true);
    };

    const handleDecision = (decision: boolean) => {
        setOpenDialog(false);

        if (decision) {
            if (post.isTrip) dispatch(deleteTrip(post.id));
            else dispatch(deleteInformation(post.id));
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        document.getElementById("scroller").scroll(0, 0);
        setPage(value);
    };

    useEffect(() => {
        if (refresh) dispatch(getPosts());
    }, [refresh, isLoaded]);

    const generatePosts = () => {
        const index = (page - 1) * 5;
        return posts?.slice(index, index + 5).map((item) => {
            return <Post key={item.id} post={item} handleDelete={handleDelete} />;
        });
    };

    return (
        <Stack
            sx={{
                mx: { xs: 1, sm: 10, md: 20, lg: 30, xl: 40 },
            }}
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 1, sm: 1.5, lg: 2 }}
        >
            {isLoaded ? (
                posts ? (
                    generatePosts()
                ) : (
                    <Typography variant="h2">Brak postów</Typography>
                )
            ) : (
                <>
                    <Stack width={"100%"} spacing={0.5}>
                        <Skeleton variant="rounded" width={"60%"} height={45} />
                        <Skeleton variant="rounded" width={"40%"} height={35} />
                        <Skeleton variant="rounded" width={"100%"} height={710} />
                        <Skeleton variant="rounded" width={"100%"} height={55} />
                    </Stack>
                </>
            )}

            <Pagination
                size="large"
                count={numberOfPages}
                page={page}
                onChange={handlePageChange}
            />
            {post && (
                <DialogConfirm
                    content={`Czy na pewno chcesz usunąć post pod tytułem:\n "${post.title}"`}
                    isDelete={true}
                    open={openDialog}
                    onClose={handleDecision}
                />
            )}
        </Stack>
    );
}

export default Home;
