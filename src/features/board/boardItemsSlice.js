import { createSlice, current } from "@reduxjs/toolkit";

const localData = JSON.parse(localStorage.getItem("trello-clone-board-items"));
const initialState = localData ? localData : [];

/*
State structure
[
    {
        id(board_id),
        columns: [
            (column_1){
                col_id,
                col_title,
                items: [
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
		addBoardColumn: (state, action) => {
			return state.map((obj) =>
				obj.boardId === action.payload.boardId
					? {
							...obj,
							columns: [...obj.columns, action.payload],
					  }
					: obj,
			);
		},
		addBoardColItems: (state, action) => {
			return state.map((obj) =>
				obj.boardId === action.payload.boardId
					? obj.columns.map((column) =>
							column.col_id === action.payload.col_id
								? {
										...obj.column,
										items: [
											...obj.column.items,
											action.payload.item,
										],
								  }
								: obj.column,
					  )
					: obj,
			);
		},
		changeColumnName: (state, action) => {
			return state.map((obj) =>
				obj.boardId === action.payload.boardId
					? {
							...obj,
							columns: obj.columns.map((column) =>
								column.col_id === action.payload.col_id
									? {
											...column,
											col_title: action.payload.col_title,
									  }
									: column,
							),
					  }
					: obj,
			);
		},
		changeItemTitle: (state, action) => {
			return state.map((obj) =>
				obj.boardId === action.payload.boardId
					? {
							...obj,
							columns: obj.columns.map((column) =>
								column.col_id === action.payload.col_id
									? {
											...column,
											items: column.items.map((item) =>
												item.item_id ===
												action.payload.item_id
													? {
															...item,
															title: action
																.payload.title,
													  }
													: item,
											),
									  }
									: column,
							),
					  }
					: obj,
			);
		},
		changeItemDescription: (state, action) => {
			return state.map((obj) =>
				obj.boardId === action.payload.boardId
					? {
							...obj,
							columns: obj.columns.map((column) =>
								column.col_id === action.payload.col_id
									? {
											...column,
											items: column.items.map((item) =>
												item.item_id ===
												action.payload.item_id
													? {
															...item,
															description:
																action.payload
																	.description,
													  }
													: item,
											),
									  }
									: column,
							),
					  }
					: obj,
			);
		},
		switchBoardColumns: (state, action) => {
			let origElemIdx = null;
			const res = [];
			for (let i = 0; i < state.length; i++) {
				const resCols = [];
				if (state[i].boardId === action.payload.boardId) {
					for (let j = 0; j < state[i].columns.length; j++) {
						const colId = state[i].columns[j].col_id;
						if (
							colId === action.payload.idOne ||
							colId === action.payload.idTwo
						) {
							// console.log("found Col", origElemIdx);
							if (origElemIdx === null) {
								origElemIdx = j;
							} else {
								const temp = state[i].columns[j];

								resCols.push(state[i].columns[origElemIdx]);
								resCols[origElemIdx] = temp;
								// console.log("switched");
								continue;
							}
						}

						resCols.push(state[i].columns[j]);
					}
				}

				res.push({
					...state[i],
					columns: resCols.length > 0 ? resCols : state[i].columns,
				});
			}

			return res;
		},
		switchBoardColItems: (state, action) => {
			let toColIdx = null;
			let fromColIdx = null;
			let foundItem = null;
			const res = [];

			for (let i = 0; i < state.length; i++) {
				let resCols = [];

				if (state[i].boardId === action.payload.boardId) {
					// console.log("found board");
					for (let j = 0; j < state[i].columns.length; j++) {
						const colId = state[i].columns[j].col_id;
						let colsNewItemState = [];

						if (colId === action.payload.toColId) {
							console.log("found toCol");
							toColIdx = j;
						} else if (colId === action.payload.fromColId) {
							fromColIdx = j;
							colsNewItemState = state[i].columns[j].items.filter(
								(item) =>
									item.item_id !== action.payload.itemId,
							);

							foundItem = state[i].columns[j].items.find(
								(item) =>
									item.item_id === action.payload.itemId,
							);

							console.log(
								"found fromCol",
								colsNewItemState,
								foundItem,
							);
						}

						if (colId === action.payload.fromColId) {
							// console.log({
							//     ...state[i].columns[j],
							//     resCols[fromColIdx]: colsNewItemState
							// });

							console.log(
								colId === action.payload.fromColId,
								colId,
								action.payload.fromColId,
								colsNewItemState,
                                resCols
							);

							resCols = resCols.map((resCol) =>
								resCol.col_id === action.payload.fromColId
									? { ...resCol, items: colsNewItemState }
									: resCol,
							);

                            console.log("here", current(resCols[0]), current(resCols[1])); //resCols
						} else {

                            if (
                                foundItem &&
                                toColIdx !== null &&
                                fromColIdx !== null
                            ) {
                                console.log("switching", resCols);
                                resCols = resCols.map((resCol) =>
                                    resCol.col_id === action.payload.toColId
                                        ? {
                                                ...resCol,
                                                items: [...resCol.items, foundItem],
                                          }
                                        : resCol,
                                );
    
                                foundItem = null;
                                // continue;
                            }
						}

						// resCols.push(
						// 	colId === action.payload.fromColId
						// 		? {
						// 				...state[i].columns[j],
						// 				columns: colsNewItemState,
						// 		  }
						// 		: state[i].columns[j],
						// );

                        console.log(current(state[i].columns[j]));
                        resCols.push(state[i].columns[j]);
					}
				}

				// console.log(resCols.length, { ...state[i], columns: resCols });
				res.push(
					resCols.length > 0
						? { ...state[i], columns: resCols }
						: state[i],
				);
			}
			// return state.map((obj) =>
			// 	obj.boardId === action.payload.boardId
			// 		? {
			// 				...obj,
			// 				columns: obj.columns.map((column) =>{
			// 					if (column.col_id === action.payload.toColId) {

			//                     } else if (column.col_id === action.payload.fromCol_id) {

			//                     }
			//                     return column
			// 				}),
			// 		  }
			// 		: obj,
			// );

			return res;
		},
		createNewItem: (state, action) => {
			console.log("reducer", action.payload, state);
			const res = state.map((obj) =>
				obj.boardId === action.payload.boardId
					? {
							...obj,
							columns: obj.columns.map((column) =>
								column.col_id === action.payload.col_id
									? {
											...column,
											items: [
												...column.items,
												action.payload.newItem,
											],
									  }
									: column,
							),
					  }
					: obj,
			);
			console.log(res);
			return res;
		},
	},
});

// resCols[toColIdx].items = [
// 	...resCols[toColIdx].items,
// 	foundItem,
// ];
// console.log(resCols);
// [
// 	...resCols,

// 	(resCols[toColIdx].items = [
// 		...resCols[toColIdx].items,
// 		foundItem,
// 	]),
// ];

// for (
// 	let k = 0;
// 	k < state[i].columns[j].items.length;
// 	k++
// ) {
// 	if (
// 		state[i].columns[j].items[k].item_id ===
// 		action.payload.itemId
// 	) {
// 		colsNewItemState =
// 			state[i].columns[j].items[k];
// 		break;
// 	}
// }

export const {
	addBoardColItems,
	addBoardColumn,
	createNewItem,
	changeColumnName,
	changeItemTitle,
	changeItemDescription,
	switchBoardColumns,
	switchBoardColItems,
} = boardItemsSlice.actions;

export const selectBoardsItems = (boardId) => (state) => {
	for (let i = 0; i < state.boardItems.length; i++) {
		if (state.boardItems[i].boardId === boardId) {
			return state.boardItems[i].columns;
		}
	}

	return null;
};

export const selectColumnItem =
	({ boardId, colId, itemId }) =>
	(state) => {
		if (!boardId && !colId && !itemId) return;

		for (let i = 0; i < state.boardItems.length; i++) {
			if (state.boardItems[i].boardId === boardId) {
				for (let j = 0; j < state.boardItems[i].columns.length; j++) {
					if (state.boardItems[i].columns[j].col_id === colId) {
						for (
							let k = 0;
							k < state.boardItems[i].columns[j].items.length;
							k++
						) {
							if (
								state.boardItems[i].columns[j].items[k]
									.item_id === itemId
							) {
								return {
									...state.boardItems[i].columns[j].items[k],
									col_title:
										state.boardItems[i].columns[j]
											.col_title,
								};
							}
						}
					}
				}
			}
		}
	};

export default boardItemsSlice.reducer;
