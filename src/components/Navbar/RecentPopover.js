import React from "react";
import { useSelector } from "react-redux";
import { selectBoardsByRecent } from "../../features/board/boardsSlice";
import Popover from "../Popover";

function RecentPopover({ isOpen }) {
	const recentBoards = useSelector(selectBoardsByRecent);

	return (
		<Popover className="top-left" title="Recent Boards" isOpen={isOpen}>
			<div>
				{recentBoards.length === 0 ? (
					<i>Nothing to show here</i>
				) : (
					recentBoards.map
				)}
			</div>
		</Popover>
	);
}

export default RecentPopover;
