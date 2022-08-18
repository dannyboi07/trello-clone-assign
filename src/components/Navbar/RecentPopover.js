import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
	// selectBoardsByRecent,
	selectBoardsForNavbar,
} from "../../features/board/boardsSlice";
import Popover from "../Popover";
import { StyledRouterLink } from "../styledComponents/common";

function RecentPopover({ isOpen }) {
    // Component outside routes, using this to get params
	const location = useLocation();
	const workspaceId = location.pathname.startsWith("/workspace/")
		? location.pathname.split("/")[2]
		: null;

	const recentBoards = useSelector(selectBoardsForNavbar(workspaceId));

    console.log(recentBoards.length, !recentBoards[0]);

	return (
		<Popover className="top-left" title="Recent Boards" isOpen={isOpen}>
			<div>
				{recentBoards.length === 0 ? (
					<i>Nothing to show here</i>
				) : (
					recentBoards.map((board) => (
						<StyledRouterLink key={board.id} to={`workspace/${workspaceId}/board/${board.id}`}>
							{board.boardBg.type === "img" ? (
								<>
									<img
										src={board.boardBg.value}
										alt="Board Image"
									/>
									<p>{board.title}</p>
								</>
							) : (
                                <>
                                    <div
									className="board-bg-img"
									style={{
                                        backgroundColor: board.boardBg.value,
									}}
								/>
                                <p>{board.title}</p>
                                </>
							)}
						</StyledRouterLink>
					))
				)}
			</div>
		</Popover>
	);
}

export default RecentPopover;
