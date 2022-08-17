import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: null,
    reducers: {
        // Both for setting an actual modal and setting it to null
        setModal: (_, action) => {
            return action.payload;
        }
    }
})

export const { setModal } = modalSlice.actions;

export const selectModal = (state) => state.modal;

export default modalSlice.reducer;