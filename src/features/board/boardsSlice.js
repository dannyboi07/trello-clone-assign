import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("trello-clone-boards"));
const initialState = localData ? localData : [];

/*
State structure of slice:
[
    {
        id,
        title,
        background: {
            type: color | img,
            color,
            img_link,
        },
        starred,

        items_id,

        workspace_id,
        workspace_title
    },
    {
        ...
    }
]
*/

export const boardsSlice = createSlice({
	name: "boards",
	initialState,
	reducers: {
		addBoard: (state, action) => {
			state.push(action.payload);
		},
		removeBoard: (state, action) => {
			state.filter((board) => board.id !== action.payload);
		},
	},
});

export const { addBoard, removeBoard } = boardsSlice.actions;

export const selectBoards = (state) => state.boards;

export const selectBoardsByRecent = (state) =>
	state.boards.sort((obj1, obj2) => obj1.last_acc >= obj2.last_acc);

export const selectStarredBoards = (state) => state.boards.filter(board => board.starred === true)

export const selectBoard = (boardId) => (state) =>
	state.boards.filter((board) => board.id === boardId);
export default boardsSlice.reducer;
