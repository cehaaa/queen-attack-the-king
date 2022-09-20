import React, { useContext } from "react";

import Cell from "../Cell/Cell";

import GameContext from "../../context/gameContext";

const Board = ({ selectedPiece, setKing }) => {
	const { board, setBoard } = useContext(GameContext);

	const setPiece = (row, col, piece) => {
		if (piece === "king") {
			setKing([row, col]);
		}

		const newBoard = [...board];
		newBoard[row][col] = piece;
		setBoard(newBoard);
	};

	return (
		<div className='grid grid-cols-8'>
			{board.map((row, rowIndex) => {
				return row.map((col, colIndex) => {
					const isEven = (rowIndex + colIndex) % 2 === 0;

					const color = isEven
						? "bg-slate-700 hover:bg-slate-800"
						: "bg-slate-600 hover:bg-slate-700";

					return (
						<Cell
							board
							color={col === "attack" ? "bg-red-500 hover:bg-red-600" : color}
							key={colIndex}
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
