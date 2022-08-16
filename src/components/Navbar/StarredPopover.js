import React from "react";
import { useSelector } from "react-redux";
import { selectStarredBoards } from "../../features/board/boardsSlice";
import Popover from "../Popover";

function StarredPopover({ isOpen }) {
	const starredBoards = useSelector(selectStarredBoards);

	return (
		<Popover
        className="top-left"
        title="Starred Boards"
        isOpen={isOpen}>
			<div>
				{starredBoards.length === 0 ? (
					<i>Nothing to show here</i>
				) : (
					starredBoards.map
				)}
			</div>
		</Popover>
	);
}

export default StarredPopover;
