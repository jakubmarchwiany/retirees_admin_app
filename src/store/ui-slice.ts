import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
    open: boolean;
    type: "error" | "info" | "success" | "warning";
    message: string;
    duration: number;
};

const initialState: UiState = {
    open: false,
    type: "success",
    message: "",
    duration: 2500,
};

type payLoadNotify = {
    type: "error" | "info" | "success" | "warning";
    message: string;
    duration?: number;
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showNotification(state, action: PayloadAction<payLoadNotify>) {
            state.open = true;
            state.type = action.payload.type;
            state.message = action.payload.message;
            state.duration = 2500;
            if (action.payload.duration !== undefined) state.duration = action.payload.duration;
        },
        showErrorNotification(state, action: PayloadAction<string>) {
            state.open = true;
            state.type = "error";
            state.message = action.payload;
            state.duration = 5000;
        },
        showErrorDefNotify(state) {
            state.open = true;
            state.type = "error";
            state.message = "Serwer nie odpowiada :(";
            state.duration = 5000;
        },
        hideNotification(state) {
            state.open = false;
        },
    },
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
