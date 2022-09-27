import { Pagination, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import DialogConfirm from "components/my/DialogConfirm";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { appActions, PostType } from "store/app-slice";
import { deleteInformation, deleteTrip, getPosts } from "store/post-actions";
import Post from "./Post";

function Home() {
    const dispatch = useAppDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [post, setPost] = useState<PostType>();
    const posts = useAppSelector((state) => state.app.posts);
    const numberOfPages = useAppSelector((state) => state.app.numberOfPages);
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const page = useAppSelector((state) => state.app.page);

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
        dispatch(appActions.setPage(value));
        dispatch(appActions.setLoading(true));
    };

    useEffect(() => {
        if (isLoading) {
            dispatch(getPosts(page - 1));
        }
    }, [isLoading]);

    const generatePosts = () => {
        return posts.map((item, index) => {
            return <Post key={item.id} post={item} handleDelete={handleDelete} />;
        });
    };

    return (
        <Stack
            sx={{
                mx: { xs: 1, sm: 10, md: 20, lg: 30, xl: 40 },
                my: { xs: 1, sm: 1.5, lg: 2 },
            }}
            justifyContent='center'
            alignItems='center'
            spacing={{ xs: 1, sm: 1.5, lg: 2 }}
        >
            <Pagination
                size='large'
                count={numberOfPages}
                page={page}
                onChange={handlePageChange}
            />
            {isLoading ? (
                <>
                    <Stack width={"100%"} spacing={0.5}>
                        <Skeleton variant='rounded' width={"60%"} height={45} />
                        <Skeleton variant='rounded' width={"40%"} height={35} />
                        <Skeleton variant='rounded' width={"100%"} height={710} />
                        <Skeleton variant='rounded' width={"100%"} height={55} />
                    </Stack>
                </>
            ) : (
                generatePosts()
            )}
            {posts?.length === 0 && <Typography variant='h2'>Brak postów</Typography>}
            <Pagination
                size='large'
                count={numberOfPages}
                page={page}
                onChange={handlePageChange}
            />
            {post && (
                <DialogConfirm
                    content={`Czy na pewno chcesz usunąć post pod tytułem: ${post.title}?`}
                    isDelete={true}
                    open={openDialog}
                    onClose={handleDecision}
                />
            )}
        </Stack>
    );
}

export default Home;
