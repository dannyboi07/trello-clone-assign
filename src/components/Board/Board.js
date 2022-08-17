import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	addBoardColumn,
	selectBoardsItems,
	switchBoardColItems,
	switchBoardColumns,
} from "../../features/board/boardItemsSlice";
import { selectBoardById } from "../../features/board/boardsSlice";
import {
	StyledBoardBtn,
	StyledBoardColumn,
	StyledBoardCtn,
	StyledNewBoardColumn,
} from "../styledComponents/board";
import dotsHoriz from "../../assets/dots-horiz.svg";
import Column from "./Column";
import { StyledButton } from "../styledComponents/common";
import addIconSvg from "../../assets/add-icon.svg";
import closeSvg from "../../assets/close-cross.svg";

function Board() {
	const dispatch = useDispatch();
	const { boardId } = useParams();
	const board = useSelector(selectBoardById(boardId));
	const boardItems = useSelector(selectBoardsItems(boardId));

	const [newColState, setNewColState] = useState(false);
	const [newColTitle, setNewColTitle] = useState("");
	const draggedBoardItemRef = useRef(null);

	console.log(boardItems);

	function handleBoardItemDrag(e) {
		// Below check exists for resolving the conflict where if a draggable child
		// of a draggable parent is dragged, the parent's drag is triggered too.
		// Could use stopPropagation in the child, but then I'd have to move all
		// the handlers, dispatchers down a level or two.

		// When the child is dragged, below ref will be filled with it's details.
		// Until the drag event is done with the ref will be truthy.
		// Parent's details will not be recorded.
		// Ref will be set to null again after dispatching the needed actions,
		// Done by handleBoardItemDrop. This works as a "waiter", basically discarding & ignoring
		// the parent's unneeded drag trigger
		if (!draggedBoardItemRef.current) {
			if (e.currentTarget.dataset?.type === "column") {
				draggedBoardItemRef.current = {
					type: e.currentTarget.dataset?.type,
					id: e.currentTarget.id,
				};
			} else if (e.currentTarget.dataset?.type === "item") {
				draggedBoardItemRef.current = {
					type: e.currentTarget.dataset?.type,
					id: e.currentTarget.id,
					colId: e.currentTarget.dataset?.colid,
				};
			}
		}
		// console.log("dragstart", draggedBoardItemRef.current);
	}

	function handleBoardItemDragEnd(e) {
		e.preventDefault();
	}

	function handleBoardItemDrop(e) {
		// console.log("dropped", draggedBoardItemRef.current, e);
		// console.log(e, e.currentTarget.id, e.currentTarget.dataset);
		e.preventDefault();

		if (!draggedBoardItemRef.current) return;

		if (
			e.currentTarget.dataset?.type === "column" &&
			draggedBoardItemRef.current.type === "column" &&
			e.currentTarget.id !== draggedBoardItemRef.current.id
		) {
			// if (draggedBoardItemRef.current.type === "column") {
			console.log("dispatching switch columns");
			dispatch(
				switchBoardColumns({
					boardId,
					idOne: draggedBoardItemRef.current.id,
					idTwo: e.currentTarget.id,
				}),
			);
			draggedBoardItemRef.current = null;
		} else if (
			e.currentTarget.dataset?.type === "column" &&
			draggedBoardItemRef.current.type === "item" &&
			e.currentTarget.id !== draggedBoardItemRef.current.colId
		) {
			console.log("dispatching switch items");
			dispatch(
				switchBoardColItems({
					boardId,
					itemId: draggedBoardItemRef.current.id,
					fromColId: draggedBoardItemRef.current.colId,
					toColId: e.currentTarget.id,
				}),
			);
			draggedBoardItemRef.current = null;
		}
	}

	function handleNewCol() {
		if (newColTitle.trim().length > 0) {
			dispatch(
				addBoardColumn({
					boardId,
					colTitle: newColTitle,
				}),
			);
			setNewColTitle("");
			setNewColState(false);
			return;
		}

		window.alert("Column title cannot be empty");
	}

	if (!board) {
		return <h2>Loading...</h2>;
	}

	return (
		<StyledBoardCtn
			style={
				board.boardBg.type === "color"
					? {
							backgroundColor: board.boardBg.value,
					  }
					: {
							backgroundImage: `url(${board.boardBg.value})`,
					  }
			}
		>
			<h3>{board.title}</h3>

			<div>
				{boardItems &&
					boardItems.length > 0 &&
					boardItems.map((boardItem) => (
						<Column
							key={boardItem.col_id}
							boardId={boardId}
							colId={boardItem.col_id}
							colTitle={boardItem.col_title}
							boardItems={boardItem.items}
							handleBoardItemDrag={handleBoardItemDrag}
							handleBoardItemDragEnd={handleBoardItemDragEnd}
							handleBoardItemDrop={handleBoardItemDrop}
						/>
					))}

				<StyledNewBoardColumn>
					<StyledButton onClick={() => setNewColState(true)}>
						<img src={addIconSvg} alt="Add" />
						Add another list
					</StyledButton>

					<div
						className="add-list-ctn"
						data-state={`${newColState ? "open" : ""}`}
					>
						<textarea
							value={newColTitle}
							onChange={(e) => setNewColTitle(e.target.value)}
							placeholder="Enter list title..."
						/>

						<div>
							<StyledBoardBtn onClick={handleNewCol}>
								Add List
							</StyledBoardBtn>

							<StyledBoardBtn
								onClick={() => {
									setNewColState(false);
									setNewColTitle("");
								}}
							>
								<img src={closeSvg} alt="Close" />
							</StyledBoardBtn>
						</div>
					</div>
				</StyledNewBoardColumn>
			</div>
		</StyledBoardCtn>
	);
}

export default Board;

{
	/* <StyledBoardColumn key={boardItem.col_id}>
							<div>
								<textarea
                                    
									value={boardItem.col_title}
									onChange={(e) => setColName(e.target.value)}
									onBlur={() => setColName("")}
								/>

								<button>
									<img src={dotsHoriz} alt="More" />
								</button>
							</div>

							{boardItem.items &&
								boardItem.items.length > 0 &&
								boardItem.items.map((item) => (
									<p key={item.item_id}>{item.title}</p>
								))}
						</StyledBoardColumn> */
}
