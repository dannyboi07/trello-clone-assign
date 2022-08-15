import React, { useState } from "react";
import { StyledPopover } from "./styledComponents/common";
import {
	StyledCreateBoard,
	StyledWorkspaceCtn,
} from "./styledComponents/workspace";

function Workspace() {
	const [createBoardPopover, setCreateBoardPopover] = useState(false);

	return (
		<StyledWorkspaceCtn>
			<h1>Boards</h1>
			<div>
				Showing 1 of 1 boards
				<div>
					<StyledCreateBoard
						onClick={() =>
							setCreateBoardPopover(!createBoardPopover)
						}
					>
						Create new board

                        <StyledPopover
                        className="top-left"
                        data-state={`${createBoardPopover ? "open" : "" }`}
                        style={{
                            top: 0,
                            left: "100%",
                        }}>

                        </StyledPopover>
					</StyledCreateBoard>
				</div>
			</div>
		</StyledWorkspaceCtn>
	);
}

export default Workspace;
