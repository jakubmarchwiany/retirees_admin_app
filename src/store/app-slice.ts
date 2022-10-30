import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PostType = {
    id: string;
    isTrip: boolean;
    title: string;
    startDate: Date;
    endDate: Date;
    imageID: string;
    content: string;
};

type AppState = {
    refresh: boolean;
    isLoaded: boolean;
    posts: PostType[] | undefined;
    numberOfPages: number | undefined;
};

const initialState: AppState = {
    refresh: true,
    isLoaded: false,
    posts: undefined,
    numberOfPages: 1,
};

type PropsSetRefresh = {
    posts: PostType[] | undefined;
    numberOfPages: number | undefined;
};

const appSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setRefresh(state, action: PayloadAction<boolean>) {
            state.refresh = action.payload;
        },
        setIsLoaded(state, action: PayloadAction<boolean>) {
            state.isLoaded = action.payload;
        },
        setPosts(state, action: PayloadAction<PropsSetRefresh>) {
            state.posts = action.payload.posts;
            state.numberOfPages = action.payload.numberOfPages;
        },
    },
});
export const appActions = appSlice.actions;
export default appSlice.reducer;
