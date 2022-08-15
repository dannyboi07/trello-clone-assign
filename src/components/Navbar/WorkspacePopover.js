import React from "react";
import { StyledPopover } from "../styledComponents/common";

function WorkspacePopover() {
	return (
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
	);
}

export default WorkspacePopover;
