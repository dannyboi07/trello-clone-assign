import styled from "styled-components";
import { Link } from "react-router-dom";
import searchSvg from "../../assets/search.svg";

const StyledRouterLink = styled(Link)`
	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	text-decoration: none;
`;

const StyledPopover = styled.div`
	position: absolute;
	top: 2.75em;
	left: 0;

	width: 310px;

	border-radius: 0.15em;

	transform: scale(0);

	background-color: white;

	transition: transform 0.25s;

	&[data-state="open"] {
		transform: scale(1);
	}

	&.top-left {
		transform-origin: top left;
	}

	/* border: 1px solid black; */
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

	& > h4 {
		position: relative;
		font-size: 0.875rem;
		padding: 0.5em 0;

		font-weight: 400;
		text-align: center;
		color: darkslategray;

		&::after {
			position: absolute;
			left: 50%;
			bottom: 0;
			content: "";
			width: 90%;
			height: 1px;
			background-color: darkslategray;

			transform: translateX(-50%);
		}
	}

	& > div {
		font-size: 0.925rem;
		padding: 0.75em 0.9em;

		& > a {
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			column-gap: 1em;

			transition: background-color 0.25s;

			& > i {
				align-self: center;
			}

			& div.board-bg-img,
			img {
				width: 50px;
				height: 50px;
			}

			&:hover {
				background-color: var(--bg-col-active);
			}
		}
	}

	& * {
		border-radius: 0.15em;
		/* border: 1px solid black; */
	}

	z-index: 999999;
`;

const StyledInputCtn = styled.div`
	border-radius: 0.15em;
	display: "flex";

	backdrop-filter: contrast(90%);
	transition: backdrop-filter 0.25s;

	& > input {
		font-size: 0.925rem;
		padding: 0.25em 0.5em;

		border: 1px solid blue;
		display: block;
		flex: 2;
		height: 100%;
		background-color: transparent;
	}

	&:hover {
		backdrop-filter: contrast(70%);
	}

	border: 1px solid red;
`;

const StyledInput = styled.input`
	font-size: 0.825rem;
	padding: 0.5em 0.75em;
	flex: 2;
	height: 100%;
	display: "flex";

	border-radius: 0.15em;
	background-color: var(--bg-col-inactive);
	box-shadow: inset 0 0 0 2px var(--bdr-col-inactive);

	transition: background-color 0.25s, box-shadow 0.25s;

	&:focus {
		outline: none;
		background-color: white;
		box-shadow: inset 0 0 0 2px var(--bdr-col-active);
	}

	&:hover:not(:focus) {
		background-color: var(--bg-col-active);
	}
`;

const StyledSearchInputCtn = styled.div`
	width: 250px;
	height: fit-content !important;
	max-height: fit-content;

	display: flex;
	align-items: center;

	border-radius: 0.15em;
	background-color: var(--bg-col-inactive);
	box-shadow: inset 0 0 0 2px var(--bdr-col-inactive);

	transition: box-shadow 0.25s;

	& > input {
		font-size: 0.825rem;
		height: 2.5em;
		width: 100%;
		background-color: transparent;

		&:focus {
			outline: none;
		}
	}

	&::before {
		content: url(${searchSvg});
		padding: 0 0.65em;
	}

	&.search-focus {
		box-shadow: inset 0 0 0 2px var(--bdr-col-active);
	}
`;

const StyledButton = styled.button`
	display: block;
	font-size: 0.825rem;
	padding: 0.65em;
	background-color: var(--bg-col-inactive);
	transition: background-color 0.25s;

	&:hover {
		cursor: pointer;
		background-color: var(--bg-col-active);
	}
`;

const StyledCreateBoardPreview = styled.div`
	display: flex;
	flex-direction: column;

	// Preview container
	& > div:first-child {
		width: 200px;
		height: 120px;
		align-self: center;

		display: flex;
		align-items: center;
		justify-content: center;

		background-size: cover;
		background-repeat: no-repeat;

		box-shadow: 0 7px 15px rgb(0 0 0 / 15%);
	}

	& > h5 {
		font-size: 0.675rem;
		margin-top: 1.25em;
		margin-bottom: 0.25em;
	}

	& * {
		/* border: 1px solid blue; */
	}

	// Create button
	& > button {
		margin-top: 1em;
	}
`;

const StyledBoardBgPicker = styled.div`
	& > div.colors-row,
	div.imgs-row {
		display: flex;
		/* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; */
		justify-content: space-between;

		&.imgs-row {
			margin-bottom: 0.5em;

			& > div {
				background-size: cover;
				background-repeat: no-repeat;

				& > button.small-bg-choice {
					height: 40px;
					width: 64px;
					background-color: transparent;
				}
			}
		}

		&.colors-row {
			margin-top: 0.5em;

			& > button.small-bg-choice {
				width: 40px;
				height: 32px;
			}
		}

		& > div > button.small-bg-choice,
		> button.small-bg-choice {
			position: relative;
			display: block;

			&::after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				transition: background-color 0.25s;
				border-radius: 0.15em;
			}

			&:hover {
				cursor: pointer;
				&::after {
					background-color: rgba(0, 0, 0, 0.2);
				}
			}
		}
	}
`;

export {
	StyledPopover,
	StyledCreateBoardPreview,
	StyledBoardBgPicker,
	StyledInputCtn,
	StyledInput,
	StyledButton,
	StyledRouterLink,
	StyledSearchInputCtn,
};
