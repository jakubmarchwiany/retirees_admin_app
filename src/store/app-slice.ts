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
    page: number;
    isLoading: boolean;
    posts: PostType[] | null;
    numberOfPages: number | null;
};

const initialState: AppState = {
    page: 1,
    isLoading: true,
    posts: null,
    numberOfPages: 1,
};

type PropsSetRefresh = {
    posts: PostType[];
    numberOfPages: number;
};

const appSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setPosts(state, action: PayloadAction<PropsSetRefresh>) {
            state.posts = action.payload.posts;
            state.numberOfPages = action.payload.numberOfPages;
        },
    },
});
export const appActions = appSlice.actions;
export default appSlice.reducer;
