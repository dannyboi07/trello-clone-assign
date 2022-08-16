import React from "react";
import { StyledPopover } from "./styledComponents/common";

function Popover({ className, title, isOpen, children }) {
	return (
		<StyledPopover
			className={className}
			data-state={`${isOpen ? "open" : ""}`}
			onClick={(e) => e.stopPropagation()}
		>
			<h4>{title}</h4>

			{
                children
            }
		</StyledPopover>
	);
}

export default Popover;
