import { AppThunk } from "store";
import { authorizationFail, getFetch } from "utils/fetches";

export const autoLogin =
    (isLoading: Function): AppThunk =>
    () => {
        getFetch<never>("/auth/auto-login", { customError: true })
            .then(() => {
                isLoading(false);
            })
            .catch(() => {
                authorizationFail();
            });
    };
