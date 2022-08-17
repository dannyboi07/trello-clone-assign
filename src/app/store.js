import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
import workspaceReducer from "../features/workspace/workspaceSlice";
import boardReducer from "../features/board/boardsSlice";
import boardItemsReducer from "../features/board/boardItemsSlice";
import modalReducer from "../features/modal/modalSlice";
import { v4 as uuidv4 } from "uuid";

function createNewBoardsItems(boardId) {
	const time = Date.now();
	return {
		boardId,
		columns: [
			{
				col_id: uuidv4(),
				col_title: "To Do",
				items: [
					{
						item_id: uuidv4(),
						title: "To Do Item",
						description: "",
						isWatched: false,
						activity: [
							{
								act_id: uuidv4(),
								type: "update",
								time,
							},
						],
					},
				],
			},
			{
				col_id: uuidv4(),
				col_title: "Doing",
				items: [
					{
						item_id: uuidv4(),
						title: "Doing Item",
						description: "",
						isWatched: false,
						activity: [
							{
								act_id: uuidv4(),
								type: "update",
								time,
							},
						],
					},
				],
			},
			{
				col_id: uuidv4(),
				col_title: "Done",
				items: [
					{
						item_id: uuidv4(),
						title: "Done Item",
						description: "",
						isWatched: false,
						activity: [
							{
								act_id: uuidv4(),
								type: "update",
								time,
							},
						],
					},
				],
			},
		],
	};
}

const writeToLocalStorageMiddleware =
	({ getState }) =>
	(next) =>
	(action) => {
		if (action.type?.startsWith("boards/")) {
			if (action.type?.endsWith("addBoard")) {
				localStorage.setItem(
					"trello-clone-boards",
					JSON.stringify([...getState().boards, action.payload]),
				);

				localStorage.setItem(
					"trello-clone-board-items",
					JSON.stringify([
						...getState().boardItems,
						createNewBoardsItems(action.payload.id),
					]),
				);
			} else if (action.type?.endsWith("removeBoard")) {
				localStorage.setItem(
					"trello-clone-boards",
					JSON.stringify([
						...getState().boards.filter(
							(board) => board.id !== action.payload,
						),
					]),
				);
			}
		} else if (action.type?.startsWith("workspaces/")) {
			if (action.type?.endsWith("addWorkspace")) {
				localStorage.setItem(
					"trello-clone-workspaces",
					JSON.stringify([...getState().workspaces, action.payload]),
				);
			} else if (action.type?.endsWith("addBoardToWorkspace")) {
				localStorage.setItem(
					"trello-clone-workspaces",
					JSON.stringify(
						getState().workspaces.map((workspace) =>
							workspace.id === action.payload.workspaceId
								? {
										...workspace,
										boards: [
											...workspace.boards,
											action.payload.boardId,
										],
								  }
								: workspace,
						),
					),
				);
			} else if (action.type?.endsWith("removeBoardFromWorkspace")) {
				localStorage.setItem(
					"trello-clone-workspaces",
					JSON.stringify(
						getState().map((workspace) =>
							workspace.id === action.payload.workspaceId
								? {
										...workspace,
										boards: workspace.boards.filter(
											(boardId) =>
												boardId !==
												action.payload.boardId,
										),
								  }
								: workspace,
						),
					),
				);
			}
		} else if (action.type?.startsWith("boardItems/")) {
			if (action.type?.endsWith("changeColumnName")) {
				localStorage.setItem(
					"trello-clone-board-items",
					JSON.stringify([
						...getState().boardItems.map((obj) =>
							obj.boardId === action.payload.boardId
								? {
										...obj,
										columns: obj.columns.map((column) =>
											column.col_id ===
											action.payload.col_id
												? {
														...column,
														col_title:
															action.payload
																.col_title,
												  }
												: column,
										),
								  }
								: obj,
						),
					]),
				);
			} else if (action.type?.endsWith("changeItemTitle")) {
				localStorage.setItem(
					"trello-clone-board-items",
					JSON.stringify([
						...getState().boardItems.map((obj) =>
							obj.boardId === action.payload.boardId
								? {
										...obj,
										columns: obj.columns.map((column) =>
											column.col_id ===
											action.payload.col_id
												? {
														...column,
														items: column.items.map(
															(item) =>
																item.item_id ===
																action.payload
																	.item_id
																	? {
																			...item,
																			title: action
																				.payload
																				.title,
																	  }
																	: item,
														),
												  }
												: column,
										),
								  }
								: obj,
						),
					]),
				);
			} else if (action.type?.endsWith("changeItemDescription")) {
                console.log("middleware");
				localStorage.setItem(
					"trello-clone-board-items",
					JSON.stringify([
						...getState().boardItems.map((obj) =>
							obj.boardId === action.payload.boardId
								? {
										...obj,
										columns: obj.columns.map((column) =>
											column.col_id ===
											action.payload.col_id
												? {
														...column,
														items: column.items.map(
															(item) =>
																item.item_id ===
																action.payload
																	.item_id
																	? {
																			...item,
																			description:
																				action
																					.payload
																					.description,
																	  }
																	: item,
														),
												  }
												: column,
										),
								  }
								: obj,
						),
					]),
				);
			}
		}

		next(action);
	};

export const store = configureStore({
	reducer: {
		// counter: counterReducer,
		workspaces: workspaceReducer,
		boards: boardReducer,
		boardItems: boardItemsReducer,
		modal: modalReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(writeToLocalStorageMiddleware),
});
