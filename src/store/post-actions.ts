import { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "store";
import { dataURLtoFile } from "utils/dataURLToFile";
import { getFetch, imageFetch, postFetch } from "utils/fetches";
import { appActions, PostType } from "./app-slice";

export const getPosts = (): AppThunk => async (appDispatch) => {
    await getFetch<{ posts: PostType[] }>(`/posts/get`, { customError: true })
        .then(({ posts }) => {
            appDispatch(appActions.setPosts({ posts, numberOfPages: Math.ceil(posts.length / 5) }));
            appDispatch(appActions.setRefresh(false));
            appDispatch(appActions.setIsLoaded(true));
        })
        .catch(() => {
            appDispatch(appActions.setPosts({ posts: undefined, numberOfPages: undefined }));
            appDispatch(appActions.setRefresh(false));
            appDispatch(appActions.setIsLoaded(true));
        });
};

export const newInformation =
    (title: string, startDate: Dayjs, content: string, navigate: NavigateFunction): AppThunk =>
    async (appDispatch) => {
        if (title === "") {
            toast.error("Musisz wprowadzić tytuł posta");
            return;
        }
        if (title.length > 27) {
            toast.error("Tytuł posta nie może być dłuższy niż 27 znaków");
            return;
        }
        if (startDate === null) {
            toast.error("Musisz wybrać datę informacji");
            return;
        }
        if (content === "") {
            toast.error("Musisz wprowadzić treść informacji");
            return;
        }

        await postFetch<never>({ title, startDate, content }, "/posts/new-information", {}).then(
            () => {
                appDispatch(appActions.setIsLoaded(false));
                appDispatch(appActions.setRefresh(true));
                navigate(`/admin/home`, { replace: true });
            }
        );
    };

export const newTrip =
    (
        title: string,
        startDate: Dayjs,
        endDate: Dayjs,
        base64EncodedImage: string,
        content: string,
        navigate: NavigateFunction
    ): AppThunk =>
    async (appDispatch) => {
        if (title === "") {
            toast.error("Musisz wprowadzić tytuł posta");
            return;
        }
        if (title.length > 27) {
            toast.error("Tytuł posta nie może być dłuższy niż 27 znaków");
            return;
        }
        if (startDate === null) {
            toast.error("Musisz wybrać datę rozpoczęcia wycieczki");
            return;
        }
        if (endDate === null) {
            toast.error("Musisz wybrać datę zakończenia podróży");
            return;
        }
        if (base64EncodedImage === null) {
            toast.error("Musisz dodać zdjęcie posta");
            return;
        }
        if (content === "") {
            toast.error("Musisz wprowadzić treść posta");
            return;
        }

        const data = new FormData();
        data.append("title", title);
        data.append(
            "startDate",
            startDate.set("hour", 0).set("minute", 0).set("second", 0).toISOString()
        );
        data.append(
            "endDate",
            endDate.set("hour", 0).set("minute", 0).set("second", 0).toISOString()
        );
        data.append("image", dataURLtoFile(base64EncodedImage, "image.png"));
        data.append("content", content);

        await imageFetch<never>(data, "/posts/new-trip", {}).then(() => {
            appDispatch(appActions.setIsLoaded(false));
            appDispatch(appActions.setRefresh(true));
            navigate(`/admin/home`, { replace: true });
        });
    };

export const deleteInformation =
    (postID: string): AppThunk =>
    async (appDispatch) => {
        await getFetch<never>(`/posts/delete-information/${postID}`, {}).then(() => {
            appDispatch(appActions.setIsLoaded(false));
            appDispatch(appActions.setRefresh(true));
        });
    };

export const deleteTrip =
    (postID: string): AppThunk =>
    async (appDispatch) => {
        await getFetch<never>(`/posts/delete-trip/${postID}`, {}).then(() => {
            appDispatch(appActions.setIsLoaded(false));
            appDispatch(appActions.setRefresh(true));
        });
    };
