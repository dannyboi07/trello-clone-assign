import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	changeItemDescription,
	changeItemTitle,
	selectColumnItem,
} from "../../features/board/boardItemsSlice";
import { selectModal, setModal } from "../../features/modal/modalSlice";
import { StyledButton } from "../styledComponents/common";
import { StyledModal, StyledModelBg } from "../styledComponents/modal";
import itemTitleSvg from "../../assets/item-title.svg";
import closeModalCross from "../../assets/close-cross.svg";
import itemDescSvg from "../../assets/item-description.svg";
import itemActSvg from "../../assets/item-activity.svg";

function Modal() {
	const dispatch = useDispatch();
	const modalState = useSelector(selectModal);
	const [toGetItemQuery, setToGetItemQuery] = useState({
		boardId: null,
		colId: null,
		itemId: null,
	});
	const itemDetails = useSelector(selectColumnItem(toGetItemQuery));

	const [itemNewTitle, setItemNewTitle] = useState("");
	const [itemNewDesc, setItemNewDesc] = useState("");

	useEffect(() => {
		if (modalState && modalState.type === "edit_item_title") {
			setItemNewTitle(modalState.itemTitle);
		} else if (modalState && modalState.type === "edit_item") {
			setToGetItemQuery({
				boardId: modalState.boardId,
				colId: modalState.colId,
				itemId: modalState.itemId,
			});
		}
	}, [modalState]);

	useEffect(() => {
		if (itemDetails)
			setItemNewDesc(itemDetails.description);
	}, [itemDetails?.description]);

	function handleChangeItemTitle() {
		if (itemNewTitle && itemNewTitle !== modalState.itemTitle) {
			dispatch(
				changeItemTitle({
					boardId: modalState.boardId,
					col_id: modalState.colId,
					item_id: modalState.itemId,
					title: itemNewTitle,
				}),
			);
			dispatch(setModal(null));
		}
	}

	function handleChangeItemDesc() {
		console.log("dispatching", itemNewDesc, itemDetails.description);
		if (itemNewDesc && itemNewDesc !== itemDetails.description) {
			dispatch(
				changeItemDescription({
					boardId: modalState.boardId,
                    col_id: modalState.colId,
                    item_id: modalState.itemId,
					description: itemNewDesc,
				}),
			);
		}
	}

	if (!modalState) return <></>;
    
	if (modalState && modalState.type === "edit_item_title") {
		return (
			<StyledModelBg
				id="modal-bg"
				onClick={() => dispatch(setModal(null))}
			>
				<StyledModal
					style={{
						position: "fixed",
						top: modalState.top,
						left: modalState.left,
					}}
					onClick={(e) => e.stopPropagation()}
					data-for="item-title"
				>
					<textarea
						name=""
						value={itemNewTitle}
						onChange={(e) => setItemNewTitle(e.target.value)}
						autoFocus
					/>

					<StyledButton onClick={handleChangeItemTitle}>
						Save
					</StyledButton>
				</StyledModal>
			</StyledModelBg>
		);
	}

	if (modalState && modalState.type === "edit_item" && itemDetails) {
		return (
			<StyledModelBg onClick={() => dispatch(setModal(null))}>
				<StyledModal
					data-for="item"
					onClick={(e) => e.stopPropagation()}
				>
					<section className="modal-header-section">
						<div className="columns-ctn">
							<div>
								<div className="modal-section-title">
									<img src={itemTitleSvg} alt="Item Title" />
									<h4>{itemDetails.title}</h4>
								</div>
								<div
									className="modal-section-content"
									style={{
										marginTop: 0,
									}}
								>
									<p>in list {itemDetails.col_title}</p>
								</div>
							</div>

							<div>
								<StyledButton
									style={{
										borderRadius: "50%",
									}}
									onClick={() => dispatch(setModal(null))}
								>
									<img src={closeModalCross} alt="Close" />
								</StyledButton>
							</div>
						</div>
					</section>

					<section className="modal-body-section">
						{/* <section> split in two*/}
						<div className="columns-ctn">
							{/* left */}
							<div>
								<div>
									<div className="modal-section-title">
										<img
											src={itemDescSvg}
											alt="Item Description"
										/>
										<h4>Description</h4>
									</div>
									<div className="modal-section-content">
										<textarea
											className="item-desc"
											value={itemNewDesc}
											onChange={(e) => {
												setItemNewDesc(e.target.value);
											}}
											placeholder="Add a more detailed description"
										/>
										<div className="item-desc-more-options">
											{/* <div> */}
											<StyledButton
												onClick={handleChangeItemDesc}
											>
												Save
											</StyledButton>

											<StyledButton
												onClick={() =>
													itemDetails
														? setItemNewDesc(
																itemDetails.description,
														  )
														: setItemNewDesc("")
												}
											>
												Cancel
											</StyledButton>
											{/* </div> */}
										</div>
									</div>
								</div>

								<div>
									<div className="modal-section-title">
										<img
											src={itemActSvg}
											alt="Item activity"
										/>
										<h4>Activity</h4>
									</div>

									<div className="modal-section-content">
										{/* <div> */}
										<textarea
											className="item-comment"
											placeholder="Write a comment..."
										/>
										<div className="item-act-more-options">
											<StyledButton>Save</StyledButton>
										</div>
										{/* </div> */}
									</div>
								</div>
							</div>

							<div className="options-column-ctn">
								More options column
							</div>
						</div>
					</section>
				</StyledModal>
			</StyledModelBg>
		);
	}
}

export default Modal;
