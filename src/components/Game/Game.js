import React, { useContext, useState } from "react";

import Board from "../Board/Board";

import QueenImage from "./../../assets/queen.png";
import KingImage from "./../../assets/king.png";

import GameContext from "../../context/gameContext";

const Game = ({ setIsShowModal }) => {
	const { initialBoard, board, setBoard, selectedPiece, setSelectedPiece } =
		useContext(GameContext);

	const [king, setKing] = useState(null);

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
	};

	const reset = () => {
		setSelectedPiece("path");
		setKing(null);

		setBoard(initialBoard);
	};

	return (
		<>
			<div className='flex flex-col items-center justify-center min-h-screen font-mono bg-gray-700 text-white'>
				{/* Title */}
				<div className='text-3xl mb-10 font-semibold'>
					Queens That Can Attack the King
				</div>

				<div className='flex'>
					{/* board */}
					<Board selectedPiece={selectedPiece} king={king} setKing={setKing} />
				</div>

				<div className='flex flex-col items-center space-y-5 mt-5'>
					<div>
						Selected piece:
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

							<div className='absolute font-semibold px-5 py-1 cursor-pointer text-sm rounded-lg bg-slate-600 flex justify-center -z-10 bottom-0 group-hover:translate-y-9 group-hover:z-10 duration-200'>
								Queen
							</div>
						</div>

						<div className='relative group'>
							<button
								className='bg-slate-600 duration-200 p-3 cursor-pointer h-16 w-16 flex items-center justify-center rounded-md'
								onClick={() => selectHandle("king")}>
								<img src={KingImage} alt='king' className='h-10' />
							</button>

							<div className='absolute font-semibold px-5 py-1 cursor-pointer text-sm rounded-lg bg-slate-600 flex justify-center -z-10 bottom-0 group-hover:translate-y-9 group-hover:z-10 duration-200'>
								King
							</div>
						</div>

						<div className='relative group'>
							<button
								className='rounded px-4 py-3 bg-slate-600 font-semibold hover:bg-slate-500 duration-200'
								onClick={solve}>
								Solve Board
							</button>

							<div className='absolute font-semibold px-5 py-1 cursor-pointer text-sm rounded-lg bg-slate-600 flex justify-center -z-10 bottom-0 group-hover:translate-y-14 group-hover:z-10 duration-200 w-[250px]'>
								Find the queen that can attack the king
							</div>
						</div>

						<div className='relative group'>
							<button
								className='rounded px-4 py-3 bg-slate-600 font-semibold hover:bg-slate-500 duration-200'
								onClick={reset}>
								Reset Board
							</button>

							<div className='absolute font-semibold px-5 py-1 cursor-pointer text-sm rounded-lg bg-slate-600 flex justify-center -z-10 bottom-0 group-hover:translate-y-9 group-hover:z-10 duration-200 w-[250px]'>
								Clear all board pieces
							</div>
						</div>

						<div className='relative group'>
							<button
								className='rounded px-4 py-3 bg-slate-600 font-semibold hover:bg-slate-500 duration-200'
								onClick={() => setIsShowModal(true)}>
								About
							</button>

							<div className='absolute font-semibold px-5 py-1 cursor-pointer text-sm rounded-lg bg-slate-600 flex justify-center -z-10 bottom-0 group-hover:translate-y-9 group-hover:z-10 duration-200 w-[250px]'>
								About this project
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Game;
