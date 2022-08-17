import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addWorkspace,
	selectWorkspaces,
} from "../../features/workspace/workspaceSlice";
import {
	StyledCreateBoard,
	StyledWorkspaceCtn,
} from "../styledComponents/workspace";
import WorkspacePopover from "./WorkspacePopover";
import { v4 as uuidv4 } from "uuid";
import {
	// StyledInput,
	StyledRouterLink,
	// StyledSearchInputCtn,
} from "../styledComponents/common";
import SearchInput from "../SearchInput";

function Workspace() {
	const dispatch = useDispatch();
	const workspaces = useSelector(selectWorkspaces);
	const [filteredWorkspaces, setFilteredWorkspaces] = useState(workspaces);
	const [search, setSearch] = useState("");

	const [createWorkspacePopover, setCreateWorkspacePopover] = useState(false);
	const [newWorkspaceTitle, setNewWorkspaceTitle] = useState("");

	function handleNewWorkspaceSubmit() {
		if (newWorkspaceTitle.trim().length === 0) {
			window.alert("Title cannot be empty");
			return;
		}

		const newWorkspaceData = {
			id: uuidv4(),
			title: newWorkspaceTitle,
			boards: [],
		};
		dispatch(addWorkspace(newWorkspaceData));
		setNewWorkspaceTitle("");
		setCreateWorkspacePopover(false);
	}

	useEffect(() => {
		if (workspaces.length > 0 && search) {
			setFilteredWorkspaces(
				workspaces.filter((workspace) =>
					workspace.title
						.toLowerCase()
						.includes(search.toLowerCase()),
				),
			);
		} else {
			setFilteredWorkspaces(workspaces);
		}
	}, [search]);

	useEffect(() => {
		setFilteredWorkspaces(workspaces);
	}, [workspaces]);

	if (!filteredWorkspaces) {
		return <h1>Loading...</h1>;
	}

	return (
		<StyledWorkspaceCtn>
			<h1>Workspaces</h1>
			<div>
				<div>
					Showing {filteredWorkspaces.length} of {workspaces.length}{" "}
					workspaces
					<SearchInput
						value={search}
						setValue={setSearch}
						placeholder="Search workspaces"
					/>
				</div>
				<div>
					<StyledCreateBoard
						onClick={() =>
							setCreateWorkspacePopover(!createWorkspacePopover)
						}
						onMouseEnter={(e) => e.target.classList.add("hover")}
						onMouseLeave={(e) => e.target.classList.remove("hover")}
						tabIndex="-1"
						onBlur={(e) => {
							if (
								createWorkspacePopover &&
								!e.currentTarget.contains(e.relatedTarget)
							) {
								setCreateWorkspacePopover(false);
							}
						}}
					>
						Create new workspace
						<WorkspacePopover
							isOpen={createWorkspacePopover}
							newWorkspaceTitle={newWorkspaceTitle}
							setNewWorkspaceTitle={setNewWorkspaceTitle}
							handleSubmit={handleNewWorkspaceSubmit}
						/>
					</StyledCreateBoard>

					{filteredWorkspaces &&
						filteredWorkspaces.length > 0 &&
						filteredWorkspaces.map((workspace) => (
							<div key={workspace.id}>
								<StyledRouterLink to={`${workspace.id}`}>
									{workspace.title}
								</StyledRouterLink>
							</div>
						))}
				</div>
			</div>
		</StyledWorkspaceCtn>
	);
}

export default Workspace;
