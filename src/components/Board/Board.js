import React, { useContext } from "react";

import Cell from "../Cell/Cell";

import GameContext from "../../context/GameContext";

const Board = () => {
	const { board } = useContext(GameContext);

	return (
		<>
			<div className='grid grid-cols-8 w-full h-[360px] spawn shrink-0 md:h-[500px] gap-0 bg-white rounded overflow-hidden'>
				{board.map((row, rowIndex) => {
					return row.map((_, colIndex) => {
						return (
							<Cell
								key={`${rowIndex}-${colIndex}`}
								rowIndex={rowIndex}
								colIndex={colIndex}
								piece={board[rowIndex][colIndex]}
							/>
						);
					});
				})}
			</div>
		</>
	);
};

export default Board;
