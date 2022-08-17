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
        flex-wrap: wrap;
		column-gap: 0.5em;
		/* border: 1px solid white; */
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
	font-size: 0.825rem;
	background-color: var(--bg-col-active);

	padding: 0.65em;
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

	& > button.add-item-btn {
		/* border: 1px solid black; */
		width: 100%;
		margin-top: 0.75em;
		padding: 0.5em 0.5em;
		& > img {
			margin-right: 0.25em;
		}
	}

	& > div.add-item {
		margin-top: 0.75em;
        display: block;

        & > textarea {
            background-color: white;
            width: calc(100% - 0.9em);
            height: 50px;
        }

		& > div {
            margin-top: 0.25em;
			display: flex;
            column-gap: 0.25em;

			& > button {
				font-size: 0.725rem;
				padding: 0.5em 0.75em;

				&:first-child {
					color: white;
					background-color: var(--bdr-col-active);
				}
			}
		}
	}

	background-color: var(--column-col-one);
	/* } */
`;

export const StyledNewBoardColumn = styled.div`
    position: relative;
    width: 272px;
    min-height: 40px;
    height: fit-content;
    /* padding: 1px; */

    background-color: var(--bg-col-inactive);

    & > button {
        display: flex;
        align-items: center;
        width: 100%;
        column-gap: 0.5em;
        color: white;
        
        backdrop-filter: blur(5px);
    }

    & > div.add-list-ctn {
        position: absolute;
        background-color: var(--column-col-one);
        /* top: -25px; */
        top: -1px;
        left: -1px;
        width: calc(100% - 3px);
        /* width: 100%; */
        height: 75px;

        padding: 3px;

        border: 1px solid black;

        z-index: 99;

        transform: scaleY(0);
        transition: transform 0.15s;

        &[data-state="open"] {
            transform: scaleY(1);
        }

        & > textarea {
            font-size: 0.825rem;
            height: 1.5em;
            width: calc(100% - 1.5em);

            padding: 0.6em 0.75em 0.5em 0.75em;

            resize: none;
            outline: none;

            &:focus {
                box-shadow: inset 0 0 0 2px var(--bdr-col-active);
            }
        }

        & > div {
            display: flex;
            column-gap: 0.25em;

            & > button:first-child {
                padding: 0.5em 0.75em;
                color: white;
                background-color: var(--bdr-col-active);
            }

            & > button:last-child {
                padding: 0.5em 0.75em;
            }
        }
    }

    * {
        /* border: 1px solid red; */
    }
`

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
