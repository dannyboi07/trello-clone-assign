import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { StyledBoardBtn, StyledBoardColItem } from "../styledComponents/board";
import penSvg from "../../assets/pen.svg";
import { setModal } from "../../features/modal/modalSlice";

function ColumnItem({
	colId,
	itemId,
	itemTitle,
	itemDesc,
	itemWatch,
	itemActivity,
}) {
	const dispatch = useDispatch();
	const { boardId } = useParams();
	const itemRef = useRef(null);

	// console.log(itemWatch, itemActivity);

	function handleEditItemTitle() {
		if (itemRef.current) {
			const boundingDims = itemRef.current.getBoundingClientRect();

			dispatch(
				setModal({
					type: "edit_item_title",
					boardId,
					colId,
					itemId,
					itemTitle,
					itemDesc: itemDesc ? true : false,
					itemWatch,
					commentCount: itemActivity.filter(
						(activity) => activity.type === "comment",
					).length,
					top: boundingDims.top,
					left: boundingDims.left,
					right: boundingDims.right,
				}),
			);
		}
	}

	function handleEditItem() {
		dispatch(
			setModal({
				type: "edit_item",
				boardId,
				colId,
				itemId,
			}),
		);
	}

	return (
		<StyledBoardColItem data-type="item" onClick={handleEditItem} ref={itemRef}>
			<div>
				<p>{itemTitle}</p>
			</div>
			{/* item icons go here */}

			<StyledBoardBtn
				style={{
					padding: "0.6em",
				}}
				onClick={(e) => {
                    e.stopPropagation();
					handleEditItemTitle();
				}}
			>
				<img src={penSvg} alt="Edit" />
			</StyledBoardBtn>
		</StyledBoardColItem>
	);
}

export default ColumnItem;
