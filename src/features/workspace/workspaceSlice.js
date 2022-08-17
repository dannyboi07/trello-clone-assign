import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

let initialState = JSON.parse(localStorage.getItem("trello-clone-workspaces"));
if (!initialState) {
	initialState = [{ id: uuidv4(), title: "Your workspace", boards: [] }];
	localStorage.setItem(
		"trello-clone-workspaces",
		JSON.stringify(initialState),
	);
}

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
		addWorkspace: (state, action) => {
			state.push(action.payload);
		},
		addBoardToWorkspace: (state, action) => {
			return state.map((workspace) =>
				workspace.id === action.payload.workspaceId
					? {
							...workspace,
							boards: [
								...workspace.boards,
								action.payload.boardId,
							],
					  }
					: workspace,
			);
		},
		removeBoardFromWorkspace: (state, action) => {
			return state.map((workspace) =>
				workspace.id === action.payload.workspaceId
					? {
							...workspace,
							boards: workspace.boards.filter(
								(boardId) => boardId !== action.payload.boardId,
							),
					  }
					: workspace,
			);
		},
	},
});

// workspaceboards.filter((boardId) => boardId !== action.payload);

export const { addWorkspace, addBoardToWorkspace, removeBoardFromWorkspace } =
	workspaceSlice.actions;

export const selectWorkspaces = (state) => state.workspaces;

export const selectWorkspaceTitle = (workspaceId) => (state) => {
	for (let i = 0; i < state.workspaces.length; i++) {
		if (state.workspaces[i].id === workspaceId)
			return state.workspaces[i].title;
	}

	return null;
};

export default workspaceSlice.reducer;
