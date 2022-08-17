import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
	StyledBoardBtn,
	StyledBoardColumn,
	// StyledBoardCtn,
} from "../styledComponents/board";
import dotsHoriz from "../../assets/dots-horiz.svg";
import ColumnItem from "./ColumnItem";
import { changeColumnName, createNewItem } from "../../features/board/boardItemsSlice";
import addIconSvg from "../../assets/add-icon.svg";
import closeSvg from "../../assets/close-cross.svg";

function Column({
	boardId,
	colId,
	colTitle,
	boardItems,
	handleColumnDrag,
	handleColumnDragEnd,
	handleColumnDrop,
}) {
	const dispatch = useDispatch();
	const [colName, setColName] = useState(colTitle);
	const [addItemState, setAddItemState] = useState(false);
	const [newItemTitle, setNewItemTitle] = useState("");
	// console.log(boardItems[0].activity);

	function handleColNameChange(e) {
		if (colName && colName !== colTitle) {
			setColName(e.target.value);
			dispatch(
				changeColumnName({
					boardId,
					col_id: colId,
					col_title: colName,
				}),
			);
		}
	}

    function handleNewItem() {
        dispatch(createNewItem({
            boardId,
            col_id: colId,
            newItemTitle
        }))
    }

	function handleDragStart(e) {
		e.target.style.opacity = 1;
		console.log("dragstart", e, (e.target.style.opacity = 1));
		// e.stopPropagation();
		// e.preventDefault();
	}

	return (
		<StyledBoardColumn
			id={colId}
			draggable
			onDragStart={handleColumnDrag}
			// onDragEnd={handleColumnDrag}
			// onDragEnter={handleColumnDrag}
			onDragOver={handleColumnDragEnd}
			onDrop={handleColumnDrop}
			data-type="column"
			// key={colId}
			// tabIndex="0"
		>
			{/* <div> */}
			<div>
				<textarea
					value={colName}
					onChange={(e) => setColName(e.target.value)}
					onBlur={handleColNameChange}
					onMouseDown={(e) => {
						e.stopPropagation();
						// e.preventDefault()
						// console.log(e.currentTarget, e.target);
						if (e.currentTarget !== e.target) e.preventDefault();
					}}
				/>

				<StyledBoardBtn>
					<img src={dotsHoriz} alt="More" />
				</StyledBoardBtn>
			</div>

			{boardItems &&
				boardItems.length > 0 &&
				boardItems.map((item) => (
					<ColumnItem
						key={item.item_id}
						colId={colId}
						itemId={item.item_id}
						itemTitle={item.title}
						itemDesc={item.description}
						itemWatch={item.isWatched}
						itemActivity={item.activity}
					/>
				))}
			{/* </div> */}

			{addItemState ? (
				<div className="add-item">
					<textarea
						value={newItemTitle}
						onChange={(e) => setNewItemTitle(e.target.value)}
						placeholder="Enter a title for this card..."
					/>

					<div>
						<StyledBoardBtn
                        onClick={handleNewItem}>Add Card</StyledBoardBtn>

						<StyledBoardBtn onClick={() => setAddItemState(false)}>
							<img src={closeSvg} alt="Close" />
						</StyledBoardBtn>
					</div>
				</div>
			) : (
				<StyledBoardBtn
					className="add-item-btn"
					onClick={() => setAddItemState(true)}
				>
					<img src={addIconSvg} alt="Add Icon" />
					Add a card
				</StyledBoardBtn>
			)}
		</StyledBoardColumn>
	);
}

export default Column;
