import { AppThunk } from "store";
import { getFetch } from "utils/fetches";

const { DEV } = import.meta.env;

export const autoLogin =
    (isLoading: Function): AppThunk =>
    async (appDispatch) => {
        await getFetch<never>("/auth/auto-login", appDispatch, undefined, undefined, true)
            .then(() => {
                isLoading(false);
            })
            .catch((error) => {
                console.log(error);
                // if (!DEV) window.location.href = window.location.origin;
            });
    };
