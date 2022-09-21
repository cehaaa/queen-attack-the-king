import React, { useContext, useState } from "react";

import Board from "../Board/Board";

import QueenImage from "./../../assets/queen.png";
import KingImage from "./../../assets/king.png";

import GameContext from "../../context/gameContext";

const Game = () => {
	const { initialBoard, board, setBoard, selectedPiece, setSelectedPiece } =
		useContext(GameContext);

	const [king, setKing] = useState([0, 0]);

	const selectHandle = piece => {
		setSelectedPiece(piece);
	};

	const solve = () => {
		const res = [];
		let [r, c] = king;
		// check left
		for (let i = king[1]; i >= 0; i--) {
			if (board[king[0]][i] === "queen" || board[king[0]][i] === "attack") {
				res.push([king[0], i]);
				break;
			}
		}

		// check right
		for (let i = king[1]; i < 8; i++) {
			if (board[king[0]][i] === "queen" || board[king[0]][i] === "attack") {
				res.push([king[0], i]);
				break;
			}
		}

		// check top
		for (let i = king[0]; i >= 0; i--) {
			if (board[i][king[1]] === "queen" || board[i][king[1]] === "attack") {
				res.push([i, king[1]]);
				break;
			}
		}

		// check bottom
		for (let i = king[0]; i < 8; i++) {
			if (board[i][king[1]] === "queen" || board[i][king[1]] === "attack") {
				res.push([i, king[1]]);
				break;
			}
		}

		// check diagonal top left
		while (r >= 0 && c >= 0) {
			if (board[r][c] === "queen" || board[r][c] === "attack") {
				res.push([r, c]);
				break;
			}

			r -= 1;
			c -= 1;
		}
		[r, c] = king;

		// check diagonal bottom right
		while (r < 8 && c < 8) {
			if (board[r][c] === "queen" || board[r][c] === "attack") {
				res.push([r, c]);
				break;
			}

			r += 1;
			c += 1;
		}
		[r, c] = king;

		// check diagonal top right
		while (r >= 0 && c < 8) {
			if (board[r][c] === "queen" || board[r][c] === "attack") {
				res.push([r, c]);
				break;
			}

			r -= 1;
			c += 1;
		}
		[r, c] = king;

		// check diagonal bottom left
		while (r < 8 && c >= 0) {
			if (board[r][c] === "queen" || board[r][c] === "attack") {
				res.push([r, c]);
				break;
			}

			r += 1;
			c -= 1;
		}
		[r, c] = king;

		// modified board to show queen can attack
		const newBoard = board.map((row, i) =>
			row.map((col, j) => {
				if (res.some(([r, c]) => r === i && c === j)) {
					return "attack";
				}
				return col;
			})
		);

		setBoard(newBoard);

		console.log(board);
	};

	const reset = () => {
		setSelectedPiece("path");
		setKing([0, 0]);

		setBoard(initialBoard);
	};

	return (
		<>
			{/* <Modal /> */}

			<div className='flex flex-col items-center justify-center min-h-screen font-mono bg-gray-700 text-white'>
				{/* Title */}
				<div className='text-3xl mb-10 font-semibold'>
					Queens That Can Attack the King
				</div>

				<div className='flex'>
					{/* board */}
					<Board selectedPiece={selectedPiece} setKing={setKing} />
				</div>

				<div className='flex flex-col items-center space-y-5 mt-5'>
					<div>
						Selected piece:{" "}
						{selectedPiece === "path"
							? "Please select a piece"
							: selectedPiece.charAt(0).toUpperCase() + selectedPiece.slice(1)}
					</div>

					<div className='flex items-center  space-x-5'>
						<div className='relative group'>
							<button
								className='bg-slate-600 duration-200 p-3 cursor-pointer h-16 w-16 flex items-center justify-center rounded-md'
								onClick={() => selectHandle("queen")}>
								<img src={QueenImage} alt='queen' className='h-10' />
							</button>
							<div className='font-semibold w-20 py-1 text-sm rounded-lg bg-slate-600 flex justify-center -bottom-0 group-hover:-bottom-10 -right-2 absolute opacity-0 group-hover:opacity-100 duration-200 border -z-10 group-hover:z-10'>
								Queen
							</div>
						</div>

						<div className='relative group'>
							<button
								className='bg-slate-600 duration-200 p-3 cursor-pointer h-16 w-16 flex items-center justify-center rounded-md'
								onClick={() => selectHandle("king")}>
								<img src={KingImage} alt='queen' className='h-10' />
							</button>
							<div className='font-semibold w-20 py-1 text-sm rounded-lg bg-slate-600 flex justify-center -bottom-0 group-hover:-bottom-10 -right-2 absolute opacity-0 group-hover:opacity-100 duration-200 border -z-10 group-hover:z-10'>
								King
							</div>
						</div>

						<div className='relative group'>
							<button
								className='rounded px-4 py-3 bg-slate-600 font-semibold hover:bg-slate-500 duration-200'
								onClick={solve}>
								Solve Board
							</button>
							<div className='font-semibold px-5 w-[250px] py-1 text-sm rounded-lg bg-slate-600 flex justify-center bottom-0 group-hover:-bottom-14 -right-12 absolute opacity-0 group-hover:opacity-100 duration-200 border -z-10 group-hover:z-10'>
								Find the queen that can attack the king
							</div>
						</div>

						<div className='relative group'>
							<button
								className='rounded px-4 py-3 bg-slate-600 font-semibold hover:bg-slate-500 duration-200'
								onClick={reset}>
								Reset Board
							</button>
							<div className='font-semibold px-5 w-[250px] py-1 text-sm rounded-lg bg-slate-600 flex justify-center bottom-0 group-hover:-bottom-10 -right-12 absolute opacity-0 group-hover:opacity-100 duration-200 border -z-10 group-hover:z-10'>
								Clear all board pieces
							</div>
						</div>

						{/* <button
							className='rounded px-4 py-3 bg-slate-600 font-semibold hover:bg-slate-500 duration-200'
							onClick={reset}>
							Reset Board
						</button> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Game;
