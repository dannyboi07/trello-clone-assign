import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
	StyledBoardBtn,
	StyledBoardColumn,
	StyledBoardCtn,
} from "../styledComponents/board";
import dotsHoriz from "../../assets/dots-horiz.svg";
import ColumnItem from "./ColumnItem";
import { changeColumnName } from "../../features/board/boardItemsSlice";

function Column({
	boardId,
	colId,
	colTitle,
	boardItems,
	handleColumnDrag,
	handleColumnDragEnd,
    handleColumnDrop
}) {
	const dispatch = useDispatch();
	const [colName, setColName] = useState(colTitle);
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
		</StyledBoardColumn>
	);
}

export default Column;
