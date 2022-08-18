import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectWorkspaces } from "../../features/workspace/workspaceSlice";
import Popover from "../Popover";

function WorkspacesPopover({ isOpen }) {
	const workspaces = useSelector(selectWorkspaces);
    // console.log(workspaces);
    
	return (
		<Popover className="top-left" title="Workspaces" isOpen={isOpen}>
			<div>
				{workspaces.length === 0 ? (
					<i>Nothing to show here</i>
				) : (
					workspaces.map((workspace) => (
						<Link key={workspace.id}
                        to={`workspace/${workspace.id}`}>
                            <p>
                                {
                                    workspace.title
                                }
                            </p>
                        </Link>
					))
				)}
			</div>
		</Popover>
	);
}

export default WorkspacesPopover;
