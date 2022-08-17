import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBoardsItems, switchBoardColumns } from "../../features/board/boardItemsSlice";
import { selectBoardById } from "../../features/board/boardsSlice";
import { StyledBoardColumn, StyledBoardCtn } from "../styledComponents/board";
import dotsHoriz from "../../assets/dots-horiz.svg";
import Column from "./Column";

function Board() {
    const dispatch = useDispatch();
	const { boardId } = useParams();
	const board = useSelector(selectBoardById(boardId));
	const boardItems = useSelector(selectBoardsItems(boardId));
    const draggedElemRef = useRef(null);

	// const [colName, setColName] = useState("");

	// console.log(boardItems);

	// function changeColName(e) {}

    function handleColumnDrag(e) {
        // console.log(e, e.target.getBoundingClientRect(), e.currentTarget, e.relatedTarget, e.target)
        // if (e.currentTarget !== e.target) {
        //     e.preventDefault();
        // }
        draggedElemRef.current = {
            type: e.currentTarget.dataset?.type,
            id: e.currentTarget.id
        }
        console.log("dragstart", draggedElemRef.current)
        // e.preventDefault();
    }

    function handleColumnDragEnd(e) {
        e.preventDefault();
        // console.log(e, e.currentTarget)
    }

    function handleColumnDrop(e) {
        console.log("dropped")
        e.preventDefault();
        if (e.currentTarget.dataset?.type === draggedElemRef.current.type) {
            dispatch(switchBoardColumns({
                boardId,
                idOne: draggedElemRef.current.id,
                idTwo: e.currentTarget.id
            }))
        }
        console.log(e, e.currentTarget.id, e.currentTarget.dataset)
        draggedElemRef.current = null;
    }

	if (!board) {
		return <h2>Loading...</h2>;
	}

	return (
		<StyledBoardCtn
			style={
				board.boardBg.type === "color"
					? {
							backgroundColor: board.boardBg.value,
					  }
					: {
							backgroundImage: `url(${board.boardBg.value})`,
					  }
			}
		>
			<h3>{board.title}</h3>

			<div>
				{boardItems &&
					boardItems.length > 0 &&
					boardItems.map((boardItem) => (
						<Column
                            key={boardItem.col_id}
                            boardId={boardId}
							colId={boardItem.col_id}
							colTitle={boardItem.col_title}
							boardItems={boardItem.items}
                            handleColumnDrag={handleColumnDrag}
                            handleColumnDragEnd={handleColumnDragEnd}
                            handleColumnDrop={handleColumnDrop}
						/>
					))}
			</div>
		</StyledBoardCtn>
	);
}

export default Board;

{
	/* <StyledBoardColumn key={boardItem.col_id}>
							<div>
								<textarea
                                    
									value={boardItem.col_title}
									onChange={(e) => setColName(e.target.value)}
									onBlur={() => setColName("")}
								/>

								<button>
									<img src={dotsHoriz} alt="More" />
								</button>
							</div>

							{boardItem.items &&
								boardItem.items.length > 0 &&
								boardItem.items.map((item) => (
									<p key={item.item_id}>{item.title}</p>
								))}
						</StyledBoardColumn> */
}
