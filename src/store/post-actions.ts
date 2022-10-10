import { Dayjs } from "dayjs";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "store";
import { dataURLtoFile } from "utils/dataURLToFile";
import { getFetch, imageFetch, postFetch } from "utils/fetches";
import { appActions, PostType } from "./app-slice";
import { uiActions } from "./ui-slice";

export const getPosts = (): AppThunk => async (appDispatch) => {
    await getFetch<{ posts: PostType[] }>(`/posts/get`, appDispatch, undefined, undefined, true)
        .then(({ posts }) => {
            appDispatch(appActions.setPosts({ posts, numberOfPages: Math.ceil(posts.length / 5) }));
            appDispatch(appActions.setLoading(false));
        })
        .catch(() => {
            appDispatch(appActions.setPosts({ posts: [], numberOfPages: 0 }));
            appDispatch(appActions.setLoading(false));
        });
};

export const newInformation =
    (title: string, startDate: Dayjs, content: string, navigate: NavigateFunction): AppThunk =>
    async (appDispatch) => {
        if (title === "") {
            appDispatch(uiActions.showErrorNotification("Musisz wprowadzić tytuł posta"));
            return;
        }
        if (title.length > 27) {
            appDispatch(
                uiActions.showErrorNotification("Tytuł posta nie może być dłuższy niż 27 znaków"),
            );
            return;
        }
        if (startDate === null) {
            appDispatch(uiActions.showErrorNotification("Musisz wybrać datę rozpoczęcia podróży"));
            return;
        }
        if (content === "") {
            appDispatch(uiActions.showErrorNotification("Musisz wprowadzić treść informacji"));
            return;
        }

        appDispatch(
            uiActions.showNotification({
                message: "Wszystkie dane poprawne. Wysyłam post ...",
                type: "success",
            }),
        );

        await postFetch<never>(
            { title, startDate, content },
            "/posts/new-information",
            appDispatch,
        ).then(() => {
            navigate(`/admin/home`, { replace: true });
            appDispatch(appActions.setLoading(true));
        });
    };

export const newTrip =
    (
        title: string,
        startDate: Dayjs,
        endDate: Dayjs,
        base64EncodedImage: string,
        content: string,
        navigate: NavigateFunction,
    ): AppThunk =>
    async (appDispatch) => {
        if (title === "") {
            appDispatch(uiActions.showErrorNotification("Musisz wprowadzić tytuł posta"));
            return;
        }
        if (title.length > 27) {
            appDispatch(
                uiActions.showErrorNotification("Tytuł posta nie może być dłuższy niż 27 znaków"),
            );
            return;
        }
        if (startDate === null) {
            appDispatch(uiActions.showErrorNotification("Musisz wybrać datę rozpoczęcia podróży"));
            return;
        }

        if (endDate === null) {
            appDispatch(uiActions.showErrorNotification("Musisz wybrać datę zakończenia podróży"));
            return;
        }
        if (base64EncodedImage === null) {
            appDispatch(uiActions.showErrorNotification("Musisz dodać zdjęcie posta"));
            return;
        }
        if (content === "") {
            appDispatch(uiActions.showErrorNotification("Musisz wprowadzić treść posta"));
            return;
        }

        appDispatch(
            uiActions.showNotification({
                message: "Wszystkie dane poprawne. Wysyłam post ...",
                type: "success",
            }),
        );
        const data = new FormData();

        data.append("title", title);
        data.append(
            "startDate",
            startDate.set("hour", 0).set("minute", 0).set("second", 0).toISOString(),
        );
        data.append(
            "endDate",
            endDate.set("hour", 0).set("minute", 0).set("second", 0).toISOString(),
        );
        data.append("image", dataURLtoFile(base64EncodedImage, "image.png"));

        data.append("content", content);

        await imageFetch<never>(data, "/posts/new-trip", appDispatch).then(() => {
            navigate(`/admin/home`, { replace: true });
            appDispatch(appActions.setLoading(true));
        });
    };

export const deleteInformation =
    (postID: string): AppThunk =>
    async (appDispatch) => {
        await getFetch<never>(`/posts/delete-information/${postID}`, appDispatch).then(() => {
            appDispatch(appActions.setLoading(true));
        });
    };

export const deleteTrip =
    (postID: string): AppThunk =>
    async (appDispatch) => {
        await getFetch<never>(`/posts/delete-trip/${postID}`, appDispatch).then(() => {
            appDispatch(appActions.setLoading(true));
        });
    };
