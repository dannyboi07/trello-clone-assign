import styled from "styled-components";

export const StyledModelBg = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;

	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(9, 30, 66, 0.5);

	z-index: 999;
`;

export const StyledModal = styled.div`
	background-color: var(--column-col-one);

	&,
	div,
	button,
	textarea {
		border-radius: 0.15em;
	}

	& > textarea {
		font-size: 0.8rem;
		width: calc(272px - 1em);
		height: 90px;
		padding: 0.5em;

		resize: none;

		&:focus {
			outline: none;
		}
	}

	&[data-for="item-title"] {
		background-color: transparent;

		& > button {
			font-size: 0.8rem;
			margin-top: 0.75em;
			padding: 0.6em 1.75em;

			background-color: var(--bdr-col-active);
			color: white;
		}
	}

	&[data-for="item"] {
		width: 768px;
		padding: 1.25em;

		h4 {
			font-weight: 500;
		}

		p {
			font-weight: 400;
		}

		& > section {
			margin-bottom: 2em;

			& > section.modal-body-section > div.columns-ctn,
			div.columns-ctn {
				display: flex;
				justify-content: space-between;
				column-gap: 1em;

				& > div > div:not(:first-child) {
					margin-top: 1em;
				}

				// First, left column
				& > div:first-child {
					width: 100%;
				}

				& > div.options-column-ctn {
					width: 168px;
				}

				& div.modal-section-title {
					display: flex;
					align-items: center;
					margin-bottom: 0.25em;

					& > img {
						margin-right: 1em;
					}
				}

				& div.modal-section-content {
					padding-left: 2.4em;
					font-size: 0.825rem;
					margin-top: 1em;

					& > div.item-desc-more-options,
					div.item-act-more-options {
						display: flex;
						column-gap: 0.25em;
						margin-top: 0.25em;

						& button {
							font-size: 0.785rem;

							&:first-child {
								background-color: var(--bdr-col-active);
								color: white;
							}

							&:last-child:not(:focus) {
							}

							&:hover::after {
								content: "";
								width: 100%;
								height: 100%;
								background-color: var(--bg-col-inactive);
								z-index: 99;
							}
						}
					}

					& textarea {
						resize: none;
						transition: background-color 0.25s;
						outline: none;

						&.item-desc {
							padding: 1em;
							width: calc(100% - 2em);
							height: 56px;
							background-color: var(--bg-col-inactive);

							&:focus {
								background-color: white;
								box-shadow: inset 0 0 0 2px
									var(--bdr-col-active);
							}

							&:focus + div.item-desc-more-options {
								display: flex;
							}
						}

						&.item-comment {
							padding: 0.75em 1em;
							width: calc(100% - 1em);
							height: 1.5em;
							box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
								0 1px 2px rgba(0, 0, 0, 0.24);
							transition: box-shadow 0.25s;

							&:focus {
								box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
									0 3px 6px rgba(0, 0, 0, 0.23);
							}

							&:focus + div.item-act-more-options {
								display: flex;
							}
						}
					}
				}
			}
		}

		& * {
			/* border: 1px solid black; */
		}
	}
`;
