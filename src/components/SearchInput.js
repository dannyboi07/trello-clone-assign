import React, { useRef } from "react";
import { StyledSearchInputCtn } from "./styledComponents/common";

function SearchInput({ value, setValue, placeholder }) {
    const ctnRef = useRef(null);

	return (
		<StyledSearchInputCtn ref={ctnRef}>
			<input
				type="text"
				value={value}
                onFocus={() => ctnRef.current.classList.add("search-focus")}
                onBlur={() => ctnRef.current.classList.remove("search-focus")}
				onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
			/>
		</StyledSearchInputCtn>
	);
}

export default SearchInput;
