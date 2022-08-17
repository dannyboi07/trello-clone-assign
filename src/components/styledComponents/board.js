import styled from "styled-components";

export const StyledBoardCtn = styled.div`
	padding: 1em 1.5em;
	height: calc(100% - 35px);

	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;

	// div containing columns
	& > div {
		height: calc(100% - 2em);
		margin-top: 1em;

		display: flex;
		column-gap: 0.5em;
		/* border: 1px solid white; */

		& > div {
			border: 1px solid white;
		}
	}

	& div,
	button,
	textarea {
		border-radius: 0.15em;
	}
`;
export const StyledBoardColumn = styled.div`
	position: relative;
	width: 272px;
	height: fit-content;
    background-color: var(--bg-col-active);
    
	/* & > div { */
        /* width: calc(100% - 1em); */
        padding: 0.5em;
        position: relative;
        height: fit-content;
		// col header ctn
		& > div {
			display: flex;
			align-items: center;
			justify-content: space-between;

			/* border: 1px solid blue; */
			& > h4 {
				font-size: 0.925rem;
				font-weight: 500;
			}

			& > textarea {
				font-size: 0.75rem;
				font-weight: 500;
				padding: 0.45em; //0.45em 0.25em 0.45em 0.4em;

				width: 80%;
				height: 20px;

				white-space: normal;
				text-align: justify;
				/* text-align-last: center; */
				/* display: flex;
            align-items: center; */

				background-color: transparent;

				resize: none;

				&:focus {
					outline: none;
					background-color: white;
					box-shadow: inset 0 0 0 2px var(--bdr-col-active);
				}
			}

			& > button {
				padding: 0.65em;
				display: flex;
				align-items: center;

				background-color: transparent;
				transition: background-color 0.25s;

				/* border: 1px solid red; */

				&:hover {
					cursor: pointer;
					background-color: var(--bg-col-active);
				}
			}
		}

		*:hover {
			cursor: pointer;
		}

		background-color: var(--column-col-one);
	/* } */
`;

export const StyledBoardBtn = styled.button`
	/* padding: 0.65em; */
	display: flex;
	align-items: center;

	background-color: transparent;
	transition: background-color 0.25s;

	/* border: 1px solid red; */

	&:hover {
		cursor: pointer;
		background-color: var(--bg-col-active);
	}
`;

export const StyledBoardColItem = styled.div`
	position: relative;
	min-height: 35px;

	font-size: 0.8rem;
	margin-top: 0.25em;
	padding: 0 0.5em;

	background-color: white;
	box-shadow: rgb(9 30 66 / 25%) 0px 1px 0px;
	transition: background-color 0.25s;

	& > div:first-child {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	& > button {
		position: absolute;
		top: 2px;
		right: 2px;
		display: none !important;
	}

	&:hover {
		cursor: pointer;
		background-color: rgb(247, 247, 247);

		& > button {
			display: flex !important;
		}
	}

	& * {
		/* border: 1px solid black; */
	}

	/* border: 1px solid black; */
`;
