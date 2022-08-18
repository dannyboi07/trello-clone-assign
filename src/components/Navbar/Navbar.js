import React, { useState } from "react";
import { StyledNavCtn, StyledNav } from "../styledComponents/navbar";
import RecentPopover from "./RecentPopover";
import StarredPopover from "./StarredPopover";
import WorkspacesPopover from "../Workspace/WorkspacesPopover";

// function NavLi() {
// 	return (
// 		<li
// 			id="nav-btn-1"
// 			onMouseEnter={handleLiHoverOver}
// 			onMouseLeave={handleLiHoverOut}
// 			onClick={handlePopOver}
// 			tabIndex="-1"
// 			onBlur={handleLiOnBlur}
// 			data-state={`${popOver[0].state ? "active" : ""}`}
// 		>
// 			Recent
// 			<RecentPopover isOpen={popOver[0].state} />
// 		</li>
// 	);
// }

function Navbar() {
	const [popOver, setPopOver] = useState([
		{
			id: "nav-btn-1",
			state: false,
		},
		{
			id: "nav-btn-2",
			state: false,
		},
        {
            id: "nav-btn-3",
            state: false,
        }
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
						Workspaces
						<WorkspacesPopover isOpen={popOver[0].state} />
					</li>
					<li
						id="nav-btn-2"
						onMouseEnter={handleLiHoverOver}
						onMouseLeave={handleLiHoverOut}
						onClick={handlePopOver}
						tabIndex="-1"
						// onBlur={handleLiOnBlur}
						data-state={`${popOver[1].state ? "active" : ""}`}
					>
						Recent
						<RecentPopover isOpen={popOver[1].state} />
					</li>
					<li
						id="nav-btn-3"
						onMouseEnter={handleLiHoverOver}
						onMouseLeave={handleLiHoverOut}
						onClick={handlePopOver}
						tabIndex="-1"
						onBlur={handleLiOnBlur}
						data-state={`${popOver[2].state ? "active" : ""}`}
					>
						Starred
						<StarredPopover isOpen={popOver[2].state} />
					</li>
				</ul>
			</StyledNav>
		</StyledNavCtn>
	);
}

export default Navbar;
