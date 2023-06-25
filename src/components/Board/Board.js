import React, { useContext } from "react";

import Cell from "../Cell/Cell";

import GameContext from "../../context/gameContext";

const Board = ({ selectedPiece, king, setKing }) => {
	const { board, setBoard } = useContext(GameContext);

	const setPiece = (row, col, piece) => {
		if (piece === "king") {
			if (king !== null) {
				alert("You can only place one king");
				return;
			}

			setKing([row, col]);
		}

		if (piece === "queen") {
			if (board[row][col] === "king") {
				return;
			}
		}

		const newBoard = [...board];
		newBoard[row][col] = piece;
		setBoard(newBoard);
	};

	return (
		<div className='grid grid-cols-8 w-full h-[360px] spawn shrink-0 md:h-[500px] gap-0 bg-white rounded overflow-hidden'>
			{board.map((row, rowIndex) => {
				return row.map((_, colIndex) => {
					return (
						<Cell
							key={colIndex}
							rowIndex={rowIndex}
							colIndex={colIndex}
							piece={board[rowIndex][colIndex]}
							onClick={() => setPiece(rowIndex, colIndex, selectedPiece)}
						/>
					);
				});
			})}
		</div>
	);
};

export default Board;
