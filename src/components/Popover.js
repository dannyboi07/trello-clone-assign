import React from "react";
import useAnimation from "../features/useAnimation";
import { StyledPopover } from "./styledComponents/common";

function Popover({ className, style, title, isOpen, children }) {
    const [isAnim, isOnDom] = useAnimation(isOpen, 25);

    if (!isOnDom) {
        return (
            <></>
        )
    }
	return (
		<StyledPopover
			className={className}
			style={style}
			data-state={`${isAnim ? "open" : ""}`}
			onClick={(e) => e.stopPropagation()}
		>
			<h4>{title}</h4>

			{children}
		</StyledPopover>
	);
}

export default Popover;