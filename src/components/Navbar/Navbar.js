import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
	selectBoardsByRecent,
	selectStarredBoards,
} from "../../features/board/boardsSlice";
import { StyledPopover } from "../styledComponents/common";
import { StyledNavCtn, StyledNav } from "../styledComponents/navbar";

function Navbar() {
	const boardsByRecent = useSelector(selectBoardsByRecent);
	// console.log(boardsByRecent);
	const starredBoards = useSelector(selectStarredBoards);

	const [popOver, setPopOver] = useState([
		{
			id: "nav-btn-1",
			state: false,
		},
		{
			id: "nav-btn-2",
			state: false,
		},
	]);

	React.useEffect(() => {
		// console.log(popOver);
	}, [popOver]);

	// Handle opening of pop over menu
	function handlePopOver(e) {
		setPopOver(
			popOver.map((obj) =>
				obj.id === e.currentTarget.id
					? { ...obj, state: !obj.state }
					: { ...obj, state: false },
			),
		);
	}

	// Handle hover over styling of LIs
	// Styling unconventionally to prevent hover styling of LI from triggering when
	// child Pop over is hovered
	function handleLiHoverOver(e) {
		e.target.classList.add("hover");
	}
	// ...
	function handleLiHoverOut(e) {
		e.target.classList.remove("hover");
	}

	// Handle focus out, close the pop over that belongs to LI/current target id
	function handleLiOnBlur(e) {
		setPopOver(
			popOver.map((obj) =>
				obj.id === e.currentTarget.id ? { ...obj, state: false } : obj,
			),
		);
	}

	return (
		<StyledNavCtn>
			<h2>Trello</h2>
			<StyledNav>
				<ul>
					<li
						id="nav-btn-1"
						onMouseEnter={handleLiHoverOver}
						onMouseLeave={handleLiHoverOut}
						onClick={handlePopOver}
						tabIndex="-1"
						onBlur={handleLiOnBlur}
						data-state={`${popOver[0].state ? "active" : ""}`}
					>
						Recent
						<StyledPopover
							className="top-left"
							data-state={`${popOver[0].state ? "open" : ""}`}
							onClick={(e) => e.stopPropagation()}
						>
							<h4>Recent Boards</h4>

							<div>
								{boardsByRecent.length === 0 ? (
									<i>Nothing to show here</i>
								) : (
									boardsByRecent.map
								)}
							</div>
						</StyledPopover>
					</li>
					<li
						id="nav-btn-2"
						onMouseEnter={handleLiHoverOver}
						onMouseLeave={handleLiHoverOut}
						onClick={handlePopOver}
						tabIndex="-1"
						onBlur={handleLiOnBlur}
						data-state={`${popOver[1].state ? "active" : ""}`}
					>
						Starred
						<StyledPopover
							className="top-left"
							data-state={`${popOver[1].state ? "open" : ""}`}
							onClick={(e) => e.stopPropagation()}
						>
							<h4>Starred Boards</h4>

							<div>
								{starredBoards.length === 0 ? (
									<i>Nothing to show here</i>
								) : (
									starredBoards.map
								)}
							</div>
						</StyledPopover>
					</li>
				</ul>
			</StyledNav>
		</StyledNavCtn>
	);
}

export default Navbar;
