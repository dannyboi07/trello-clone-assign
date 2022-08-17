import styled from "styled-components";

const StyledWorkspaceCtn = styled.div`
	padding: 2em 7em;
	font-size: 0.925rem;

	& * {
		/* border: 1px solid black; */
	}

	& > h1 {
		border-bottom: 1px solid black;
		padding-bottom: 0.25em;
	}

	// Show workspaces|boards ctn
	& > div {
		margin-top: 1em;
        /* border: 1px solid black; */

        & > div:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

		// Actual ctn displaying workspace|boards
		& > div:not(:first-child) {

            /* border: 1px solid blue; */
			margin-top: 1em;
			display: flex;
			flex-wrap: wrap;
            /* justify-content: space-between; */
            column-gap: 1em;

			// Workspace|board ctn
			& > div {
				height: 80px;
				width: 25%;
				max-width: 300px;
				min-width: fit-content;
				font-size: 0.825rem;

				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 0.15em;

				background-color: var(--bg-col-inactive);
				transition: background-color 0.25s;

                // First child is the create workspace|board tile
				&:hover:not(:first-child) {
					cursor: pointer;
					background-color: var(--bg-col-active);
				}
			}
		}
	}
`;

const StyledCreateBoard = styled.div`
	position: relative;
	height: 80px;
	width: 25%;
	max-width: 300px;
	min-width: fit-content;
	font-size: 0.825rem;

	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.15em;

	background-color: var(--bg-col-inactive);
	transition: background-color 0.25s;

	&.hover {
        /* border: 1px solid black; */
		cursor: pointer;
		background-color: var(--bg-col-active) !important;
	} 
	/* border: 1px solid black; */
`;

export { StyledWorkspaceCtn, StyledCreateBoard };
