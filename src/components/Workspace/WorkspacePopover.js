import React from "react";
import Popover from "../Popover";
import { StyledButton, StyledInput } from "../styledComponents/common";

function WorkspacePopover({
	isOpen,
	newWorkspaceTitle,
	setNewWorkspaceTitle,
	handleSubmit,
}) {
	return (
		<Popover
			className="top-left"
			isOpen={isOpen}
			title="Create workspace"
			style={{
				top: 0,
				left: "110%",
			}}
		>
			<div>
				<h5>Workspace Title</h5>

				<StyledInput
					type="text"
					value={newWorkspaceTitle}
					style={{
						marginTop: "0.5em",
						marginBottom: "0.4em",
					}}
					onChange={(e) => setNewWorkspaceTitle(e.target.value)}
				/>
				<StyledButton
					onClick={handleSubmit}
				>
					Create
				</StyledButton>
			</div>
		</Popover>
	);
}

export default WorkspacePopover;
