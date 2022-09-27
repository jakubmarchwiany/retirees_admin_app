import { AppDispatch } from "store";
import { uiActions } from "store/ui-slice";

const { DEV, VITE_DEV_API_ENDPOINT: DEV_API_ENDPOINT } = import.meta.env;

const END_POINT: string = DEV ? DEV_API_ENDPOINT : window.location.origin + "/api";

type statusType = "error" | "info" | "success" | "warning";

export async function getFetch<T>(
    url: string,
    appDispatch: AppDispatch,
    duration = 2500,
    type: statusType = "success",
    customError = false,
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        fetch(END_POINT + url, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    appDispatch(
                        uiActions.showNotification({ message: data.message, type, duration }),
                    );
                    resolve(data);
                } else {
                    appDispatch(uiActions.showErrorNotification(data.message));
                    reject(data);
                }
            })
            .catch((error) => {
                appDispatch(uiActions.showErrorDefNotify());
                console.log(error);
                if (customError) {
                    reject(new Error());
                }
            });
    });
}

export async function postFetch<T>(
    body: object,
    url: string,
    appDispatch: AppDispatch,
    duration = 2500,
    type: statusType = "success",
    customError = false,
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        fetch(END_POINT + url, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    appDispatch(
                        uiActions.showNotification({ message: data.message, type, duration }),
                    );
                    resolve(data);
                } else {
                    appDispatch(uiActions.showErrorNotification(data.message));
                    if (customError) reject(data);
                }
            })
            .catch(() => {
                appDispatch(uiActions.showErrorDefNotify());
                if (customError) reject(new Error());
            });
    });
}

export async function imageFetch<T>(
    body: FormData,
    url: string,
    appDispatch: AppDispatch,
    duration = 2500,
    type: statusType = "success",
    customError = false,
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        fetch(END_POINT + url, {
            method: "POST",
            credentials: "include",
            body: body,
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    appDispatch(
                        uiActions.showNotification({ message: data.message, type, duration }),
                    );
                    resolve(data);
                } else {
                    appDispatch(uiActions.showErrorNotification(data.message));
                    if (customError) reject(data);
                }
            })
            .catch((error) => {
                appDispatch(uiActions.showErrorDefNotify());
                if (customError) reject(new Error());
            });
    });
}
