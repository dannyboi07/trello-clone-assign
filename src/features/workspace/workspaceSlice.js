import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("trello-clone-boards"));
const initialState = localData ? localData : [];

/*
State structure
[
    {
        id,
        title,
        boards: [
            board_id1,
            board_id2
        ]
    }
]
*/

export const workspaceSlice = createSlice({
    name: "workspaces",
    initialState,
    reducers: {
        addBoard: (state, action) => {
            state.boards.push(action.payload)
        },
        removeBoard: (state, action) => {
            state.boards.filter((boardId) => boardId !== action.payload)
        }
    }
});

export default workspaceSlice.reducer;
