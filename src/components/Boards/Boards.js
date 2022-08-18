import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	StyledCreateBoard,
	StyledWorkspaceCtn,
} from "../styledComponents/workspace";
import BoardBgPopover from "./BoardBgPopover";
import { boardBgColors } from "../../features/utils";
import SearchInput from "../SearchInput";
import {
	addBoard,
	selectBoardByWorkspace,
} from "../../features/board/boardsSlice";
import {
	addBoardToWorkspace,
	selectWorkspaceTitle,
} from "../../features/workspace/workspaceSlice";
import { v4 as uuidv4 } from "uuid";
import { StyledRouterLink } from "../styledComponents/common";

const newBoardDets = {
	boardBg: {
		type: "color",
		value: boardBgColors[0],
	},
	title: "",
};

function Boards() {
	const dispatch = useDispatch();
	const { workspaceId } = useParams();
	const workspaceTitle = useSelector(selectWorkspaceTitle(workspaceId));
	const boards = useSelector(selectBoardByWorkspace(workspaceId));

	const [createBoardPopover, setCreateBoardPopover] = useState(false);

	const [newBoardDetails, setNewBoardDetails] = useState({
		...newBoardDets,
		workspaceId,
		workspaceTitle,
	});

	console.log(boards);

	function handleBoardDetailsChange(e, type) {
		setNewBoardDetails({
			...newBoardDetails,
			[e.target.name]:
				e.target.name !== "boardBg"
					? e.target.value
					: {
							type, // Will be img or color
							value: e.target.value,
					  },
		});
	}

	function handleNewBoardSubmit() {
		if (newBoardDetails.title.trim().length === 0) {
			window.alert("Board's title cannot be empty");
			return;
		}

		const newBoardData = {
			id: uuidv4(),
			...newBoardDetails,
		};

		dispatch(addBoard(newBoardData));
		dispatch(
			addBoardToWorkspace({
				workspaceId: newBoardData.workspaceId,
				boardId: newBoardData.id,
			}),
		);

		setNewBoardDetails({
			...newBoardDets,
			workspaceId,
			workspaceTitle,
		});

		setCreateBoardPopover(false);
	}

	return (
		<StyledWorkspaceCtn>
			<h1>Boards</h1>
			<div>
				<div>
					Showing 1 of 1 boards
					<SearchInput />
				</div>
				<div>
					<StyledCreateBoard
						onClick={() =>
							setCreateBoardPopover(!createBoardPopover)
						}
						onMouseEnter={(e) => e.target.classList.add("hover")}
						onMouseLeave={(e) => e.target.classList.remove("hover")}
						tabIndex="-1"
						onBlur={(e) => {
							if (
								createBoardPopover &&
								!e.currentTarget.contains(e.relatedTarget)
							) {
								setCreateBoardPopover(false);
							}
						}}
					>
						Create new board
						<BoardBgPopover
							isOpen={createBoardPopover}
							bgPrev={newBoardDetails.boardBg}
							newBoardDetails={newBoardDetails}
							handleBoardDetailsChange={handleBoardDetailsChange}
							handleNewBoardSubmit={handleNewBoardSubmit}
						></BoardBgPopover>
					</StyledCreateBoard>

					{boards && boards[0] &&
						boards.length > 0 &&
						boards.map((board) => (
							<div
								key={board.id}
								style={
									board.boardBg.type === "color"
										? {
												backgroundColor:
													board.boardBg.value,
										  }
										: {
												backgroundImage: `url(${board.boardBg.value})`,
												backgroundPosition: "center",
												backgroundSize: "cover",
												backgroundRepeat: "no-repeat",
										  }
								}
							>
								<StyledRouterLink to={`board/${board.id}`}>
									{board.title}
								</StyledRouterLink>
							</div>
						))}
				</div>
			</div>
		</StyledWorkspaceCtn>
	);
}

export default Boards;
