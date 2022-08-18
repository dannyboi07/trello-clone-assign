import React, { useState, useEffect } from "react";
import Popover from "../Popover";
import {
	StyledCreateBoardPreview,
	StyledBoardBgPicker,
	// StyledInputCtn,
	StyledInput,
	StyledButton,
} from "../styledComponents/common";
import BoardPrevSvg from "../../assets/board-preview-skeleton.svg";
import { boardBgColors } from "../../features/utils";
import DotsHoriz from "../../assets/dots-horiz.svg";
import useFetchPics from "../../features/useFetchPics";

function BoardBgPopover({
	isOpen,
	bgPrev,
	setBgPrev,
	newBoardDetails,
	handleBoardDetailsChange,
	handleNewBoardSubmit,
}) {
	const [pics, loading, error] = useFetchPics("nature");

	return (
		<Popover
			className="top-left"
			isOpen={isOpen}
			title="Create board"
			style={{
				top: 0,
				left: "110%",
			}}
		>
			<StyledCreateBoardPreview>
				{/* Preview ctn */}
				<div
					style={
						bgPrev.type === "color"
							? { backgroundColor: bgPrev.value }
							: { backgroundImage: `url(${bgPrev.value})` }
					}
				>
					<img src={BoardPrevSvg} alt="Board Preview" />
				</div>

				<h5>Background</h5>

				<StyledBoardBgPicker>
					<div className="imgs-row">
						{pics &&
							!error &&
							pics.photos.map((pic) => (
								<div
									key={pic.id}
									style={{
										backgroundImage: `url(${pic.src.tiny})`,
									}}
								>
									<button
										name="boardBg"
										value={pic.src.landscape}
										className="small-bg-choice"
										onMouseDown={(e) => e.preventDefault()}
										onClick={(e) => {
											handleBoardDetailsChange(e, "img");
										}}
									/>
								</div>
							))}
					</div>
					<div className="colors-row">
						{boardBgColors.slice(0, 5).map((color, i) => (
							<button
								key={i}
								name="boardBg"
								value={color}
								className="small-bg-choice"
								style={{
									backgroundColor: color,
								}}
								onMouseDown={(e) => {
									e.preventDefault(); // Prevent parent's onBlur from firing
								}}
								onClick={(e) => {
									handleBoardDetailsChange(e, "color");
								}}
							/>
						))}

						<button className="small-bg-choice">
							<img src={DotsHoriz} alt="More colors" />
						</button>
					</div>
				</StyledBoardBgPicker>

				<h5>Board Title</h5>
				<StyledInput
					type="text"
					name="title"
					value={newBoardDetails.title}
					onChange={handleBoardDetailsChange}
					autoFocus
				/>

				<StyledButton onClick={handleNewBoardSubmit}>
					Create
				</StyledButton>
			</StyledCreateBoardPreview>
		</Popover>
	);
}

export default BoardBgPopover;
