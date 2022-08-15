import { createSlice } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("trello-clone-board-items"));
const initialState = localData ? localData : [];

/*
State structure
[
    {
        id(board_id),
        [
            (column_1){
                col_id,
                [
                    item_id,
                    title,
                    description,
                    activity: [
                        {
                            id,
                            type: update | comment,
                            time,
                            comment_text
                        }
                    ]
                ]
            },
            {
                ...
            }
        ]
    }
]
*/

export const boardItemsSlice = createSlice({
	name: "boardItems",
	initialState,
	reducers: {
		addBoardItems: (state, action) => {
			state.push(action.payload);
		},
		addBoardItem: (state, action) => {
			return state.map((obj) =>
				obj.id === action.payload.id
					? {
							...obj,
							...action.payload.data,
					  }
					: obj,
			);
		},
	},
});

export const selectBoardsItems = (boardId) => (state) =>
	state.boardItems.filter((boardItem) => boardItem.board_id === boardId);

export default boardItemsSlice.reducer;
